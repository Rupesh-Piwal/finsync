"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";
import { Decimal } from "@prisma/client/runtime/library";
import { AccountType } from "@prisma/client";

interface CreateAccountData {
  name: string;
  type: AccountType;
  balance: string;
  isDefault: boolean;
}

interface TransactionLike {
  balance?: Decimal;
  amount?: Decimal;
  [key: string]: any;
}

interface SerializedTransaction {
  balance?: number;
  amount?: number;
  [key: string]: any;
}

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

export async function getUserAccounts() {
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
    const serializedAccounts = accounts.map(serializeTransaction);

    return serializedAccounts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
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
