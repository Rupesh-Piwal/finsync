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
import { Account } from "@prisma/client";

const serializeTransaction = (obj: TransactionLike): SerializedTransaction => {
  const serialized: SerializedTransaction = {};

  for (const key in obj) {
    if (key === "balance" && obj.balance) {
      serialized.balance = obj.balance.toNumber();
    } else if (key === "amount" && obj.amount) {
      serialized.amount = obj.amount.toNumber();
    } else {
      serialized[key] = obj[key];
    }
  }

  return serialized;
};

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
