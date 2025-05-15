"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";
import {
  AccountData,
  BulkDeleteResult,
  SerializedAccount,
  SerializedTransaction,
  TransactionLike,
} from "@/types";
import { Account } from "@prisma/client";

const serializeTransaction = (obj: TransactionLike): SerializedTransaction => {
  return {
    id: obj.id,
    type: obj.type,
    amount: obj.amount?.toNumber() ?? 0,
    date: obj.date,
    category: obj.category,
    description: obj.description,
    status: obj.status,
    accountId: obj.account, // assuming this maps to accountId
    tags: obj.tags ?? [],
    balance: obj.balance?.toNumber() ?? 0,
    isRecurring: obj.isRecurring ?? false,
    userId: obj.userId,
    currency: obj.currency ?? "USD", // fallback if needed
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

const serializeDecimal = (obj: TransactionLike): SerializedTransaction => {
  const serialized = obj as unknown as SerializedTransaction;

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

const serializeAccount = (
  account: Account & { _count: { transactions: number } }
): SerializedAccount => {
  return {
    id: account.id,
    userId: account.userId,
    name: account.name,
    type: account.type,
    isDefault: account.isDefault,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    balance: account.balance.toNumber(),
    _count: {
      transactions: account._count.transactions,
    },
  };
};

export async function getAccountWithTransactions(
  accountId: string
): Promise<AccountData> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: {
        select: { transactions: true },
      },
    },
  });

  if (!account) throw new Error("Account not found");

  return {
    ...serializeAccount(account),
    transactions: account.transactions.map(serializeDecimal),
  };
}

export async function updateDefaultAccount(accountId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // First, unset any existing default account
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: { isDefault: false },
    });

    // Then set the new default account
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

export async function bulkDeleteTransactions(
  transactionIds: string[]
): Promise<BulkDeleteResult> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get transactions to calculate balance changes
    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    // Group transactions by account to update balances
    const accountBalanceChanges: Record<string, number> = transactions.reduce(
      (acc, transaction) => {
        const rawAmount =
          transaction.amount instanceof Object &&
          "toNumber" in transaction.amount
            ? transaction.amount.toNumber()
            : Number(transaction.amount);

        const change = transaction.type === "EXPENSE" ? rawAmount : -rawAmount;

        acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
        return acc;
      },
      {} as Record<string, number>
    );

    // Delete transactions and update account balances in a transaction
    await db.$transaction(async (tx) => {
      // Delete transactions
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      // Update account balances
      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceChanges
      )) {
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
