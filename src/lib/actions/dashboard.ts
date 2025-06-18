"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";
import {
  CreateAccountData,
  SerializedAccount,
  SerializedTransaction,
} from "@/types";
import { Account, TransactionType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const serializeTransaction = <T extends Record<string, unknown>>(
  obj: T
): SerializedTransaction => {
  return {
    id: (obj.id as string) || "",
    type: obj.type as TransactionType,
    amount: (obj.amount as Decimal)?.toNumber() || 0,
    balance: (obj.balance as Decimal)?.toNumber(),
    description: (obj.description as string) || "",
    date: (obj.date as Date)?.toISOString() || "",
    category: (obj.category as string) || "",
    isRecurring: obj.isRecurring as boolean,
    recurringInterval: obj.recurringInterval as string,
    nextRecurringDate: (obj.nextRecurringDate as Date)?.toISOString() || "",
    lastProcessed: obj.lastProcessed as string,
    status: obj.status as string,
    userId: (obj.userId as string) || "",
    accountId: obj.accountId as string,
    currency: obj.currency as string,
    tags: (obj.tags as string[]) || [],
    createdAt: (obj.createdAt as Date)?.toISOString() || "",
    updatedAt: (obj.updatedAt as Date)?.toISOString() || "",
  };
};

const serializeAccount = (
  account: Account & { _count: { transactions: number | string } }
): SerializedAccount => {
  const { balance, _count, ...rest } = account;

  let balanceNumber: number;
  if (balance instanceof Decimal) {
    balanceNumber = balance.toNumber();
  } else if (typeof balance === "number") {
    balanceNumber = balance;
  } else {
    balanceNumber = Number(balance) || 0;
  }

  return {
    ...rest,
    balance: balanceNumber,
    _count: {
      transactions: _count?.transactions ?? 0,
    },
  };
};

export async function getUserAccounts(): Promise<SerializedAccount[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    const serializedAccounts = accounts.map(serializeAccount);

    return serializedAccounts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return [];
  }
}

export const createAccount = async (data: CreateAccountData) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    const serializedAccount = serializeTransaction(account);

    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    console.error("Auth Error", error);
  }
};
export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}
