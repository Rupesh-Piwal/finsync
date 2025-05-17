import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import { AccountCard } from "./_components/accounts-card";
import { getDashboardData, getUserAccounts } from "@/lib/actions/dashboard";
import { BudgetProgress } from "./_components/budget-progress";
import { getCurrentBudget } from "@/lib/actions/budget";

const page = async () => {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="sapce-y-8">
      {/* BUDGET PROCESS  */}
      <BudgetProgress
        initialBudget={budgetData?.budget ?? null}
        currentExpenses={budgetData?.currentExpenses || 0}
      />
      {/* DASHBOARD PROCESS  */}
      {/* ACCOUNTS GRID  */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-700 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden group">
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <div className="p-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-4 group-hover:from-emerald-400 group-hover:to-teal-400 transition-colors">
                <Plus className="h-6 w-6 text-gray-900" />
              </div>
              <p className="text-md font-medium text-gray-200 group-hover:text-teal-300 transition-colors">
                Add New Account
              </p>
              <div className="mt-2 w-12 h-0.5 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
};

export default page;
