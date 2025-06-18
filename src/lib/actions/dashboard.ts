"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";
import {
  CreateAccountData,
  SerializedAccount,
  SerializedTransaction,
  TransactionLike,
} from "@/types";
import { Account } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const serializeTransaction = (obj: TransactionLike): SerializedTransaction => {
  return {
    id: obj.id,
    type: obj.type,
    amount: obj.amount?.toNumber() || 0,
    balance: obj.balance?.toNumber(),
    description: obj.description,
    date: obj.date?.toISOString() || "",
    category: obj.category,
    isRecurring: obj.isRecurring,
    recurringInterval: obj.recurringInterval,
    nextRecurringDate: obj.nextRecurringDate,
    lastProcessed: obj.lastProcessed,
    status: obj.status,
    userId: obj.userId,
    accountId: obj.accountId, 
    currency: obj.currency,
    tags: obj.tags || [],
    createdAt: obj.createdAt?.toISOString() || "",
    updatedAt: obj.updatedAt?.toISOString() || "",
  };
};



const serializeAccount = (account: Account): SerializedAccount => {
  const { balance, _count, ...rest } = account;
  
  let balanceNumber: number;
  if (balance instanceof Decimal) {
    balanceNumber = balance.toNumber();
  } else if (typeof balance === 'number') {
    balanceNumber = balance;
  } else {
    balanceNumber = Number(balance) || 0;
  }

  return {
    ...rest,
    balance: balanceNumber,
    _count: {
      transactions: _count?.transactions ?? 0
    }
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
