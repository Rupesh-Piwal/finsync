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

const serializeTransaction = (obj: TransactionLike): SerializedTransaction => {
  // Create an object to hold serialized fields, starting empty but typed Partial to allow stepwise filling
  const serialized: Partial<SerializedTransaction> = {};

  for (const key in obj) {
    if (
      key === "balance" &&
      obj.balance !== undefined &&
      obj.balance !== null
    ) {
      // assuming obj.balance has toNumber method
      serialized.balance = obj.balance.toNumber();
    } else if (
      key === "amount" &&
      obj.amount !== undefined &&
      obj.amount !== null
    ) {
      serialized.amount = obj.amount.toNumber();
    } else if (
      key === "id" ||
      key === "type" ||
      key === "date" ||
      key === "category" ||
      key === "description" ||
      key === "isRecurring"
    ) {
      // For known string keys on SerializedTransaction, assign directly (cast as needed)
      serialized[key] = obj[key] as any;
    }
    // Ignore any keys not in SerializedTransaction
  }

  // Now, cast to SerializedTransaction after you ensured all required fields are there
  // (You might want to add runtime checks here)
  return serialized as SerializedTransaction;
};

const serializeAccount = (obj: any): SerializedAccount => {
  const serialized = { ...obj };
  if (obj.balance && typeof obj.balance.toNumber === "function") {
    serialized.balance = obj.balance.toNumber();
  }
  return serialized;
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

    // Serialize accounts before sending to client
    const serializedAccounts = accounts.map(serializeAccount);

    return serializedAccounts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return []; // Ensure consistent return type
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

    //  CHECK IF THIS IS THE USER'S FIRST ACCOUNT
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    // If it's the first account, make it default regardless of user input
    // If not, use the user's preference
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    // If this account should be default, unset other default accounts
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // Create new account
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault, // Override the isDefault based on our logic
      },
    });

    // Serialize the account before returning
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

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}
