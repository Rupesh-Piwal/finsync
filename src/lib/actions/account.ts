"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";
import {
  AccountData,
  SerializedAccount,
  SerializedTransaction,
  TransactionLike,
} from "@/types";
import { Account, Transaction } from "@prisma/client";

// Helper function to serialize a transaction
const serializeTransaction = (obj: TransactionLike): SerializedTransaction => {
  const serialized = {} as SerializedTransaction;

  for (const key in obj) {
    if (key === "balance" && obj.balance) {
      serialized.balance = obj.balance.toNumber();
    } else if (key === "amount" && obj.amount) {
      serialized.amount = obj.amount.toNumber();
    } else {
      (serialized as any)[key] = (obj as any)[key];
    }
  }

  return serialized;
};

// Similar to above, just simplified
const serializeDecimal = (obj: TransactionLike): SerializedTransaction => {
  const serialized = { ...obj } as SerializedTransaction;
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

// Serialize an account with transaction count
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

// Get account with all transactions for the logged-in user
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

// Set the default account for the user
export async function updateDefaultAccount(
  accountId: string
): Promise<
  | { success: true; data: SerializedTransaction }
  | { success: false; error: string }
> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Unset current default account
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: { isDefault: false },
    });

    // Set new default account
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: err };
  }
}

// Delete multiple transactions and update balances
export async function bulkDeleteTransactions(
  transactionIds: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    const accountBalanceChanges: Record<string, number> = transactions.reduce(
      (acc: Record<string, number>, transaction: Transaction) => {
        const change =
          transaction.type === "EXPENSE"
            ? transaction.amount.toNumber()
            : -transaction.amount.toNumber();

        acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
        return acc;
      },
      {}
    );

    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

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
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: err };
  }
}
