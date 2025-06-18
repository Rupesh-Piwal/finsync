import {
  Transaction,
  TransactionType,
  RecurringInterval,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { SerializedTransaction } from "@/types";

export function rehydrateTransaction(
  transaction: SerializedTransaction
): Transaction {
  return {
    id: transaction.id,
    type: transaction.type as TransactionType,
    amount: new Decimal(transaction.amount),
    description: transaction.description ?? "",
    date: new Date(transaction.date),
    category: transaction.category ?? "",
    receiptUrl: transaction.receiptUrl ?? "",
    isRecurring: transaction.isRecurring ?? false,
    recurringInterval: transaction.recurringInterval
      ? (transaction.recurringInterval as RecurringInterval)
      : null,
    accountId: transaction.accountId,
    userId: transaction.userId,
    createdAt: new Date(transaction.createdAt),
    updatedAt: new Date(transaction.updatedAt),
  } as Transaction;
}
