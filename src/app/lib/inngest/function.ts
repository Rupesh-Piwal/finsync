import { db } from "@/lib/prisma";
import { SerializedTransaction } from "@/types";
import { inngest } from "./client";

// 3. Budget Alerts with Event Batching
export const checkBudgetAlerts = inngest.createFunction(
  { id: "check-budget-alerts", name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" }, // Every 6 hours
  async ({ step }) => {
    const budgets = await step.run("fetch-budgets", async () => {
      return await db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: {
                where: {
                  isDefault: true,
                },
              },
            },
          },
        },
      });
    });

    for (const budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) continue; // Skip if no default account

      await step.run(`check-budget-${budget.id}`, async () => {
        const startDate = new Date();
        startDate.setDate(1); // Start of current month

        // Calculate total expenses for the default account only
        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id, // Only consider default account
            type: "EXPENSE",
            date: {
              gte: startDate,
            },
          },
          _sum: {
            amount: true,
          },
        });

        const totalExpenses = expenses._sum.amount?.toNumber() || 0;
        const budgetAmount = budget.amount;
        const percentageUsed = (totalExpenses / parseFloat(budgetAmount)) * 100;

        console.log(percentageUsed);
        console.log("🚨 Inside step run for budget:", budget.id);
        console.log("percentUsed =", percentageUsed);
        console.log("lastAlertSent =", budget.lastAlertSent);
        console.log(
          "Should send alert:",
          percentageUsed >= 70 &&
            (!budget.lastAlertSent ||
              isNewMonth(new Date(budget.lastAlertSent), new Date()))
        );

        // Check if we should send an alert
        if (
          percentageUsed >= 70 && // Default threshold of 80%
          (!budget.lastAlertSent ||
            isNewMonth(new Date(budget.lastAlertSent), new Date()))
        ) {
          // ----SEND EMAIL---
          console.log(
            "Percentage used:",
            percentageUsed,
            "Last alert:",
            budget.lastAlertSent
          );

          // Update last alert sent
          try {
            const updated = await db.budget.update({
              where: { id: budget.id },
              data: { lastAlertSent: new Date() },
            });
            console.log(
              "✅ Alert sent and lastAlertSent updated:",
              updated.lastAlertSent
            );
          } catch (error) {
            console.error("❌ Failed to update lastAlertSent", error);
          }
        }
      });
    }
  }
);

function isNewMonth(lastAlertDate: Date, currentDate: Date): boolean {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}
