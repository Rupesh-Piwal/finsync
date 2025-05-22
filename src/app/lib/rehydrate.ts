import { Decimal } from "@prisma/client/runtime/library"; // adjust if using 'decimal.js'
import type { Transaction } from "@prisma/client";

export function rehydrateTransaction(transaction: any): Transaction {
  return {
    ...transaction,
    amount: new Decimal(transaction.amount),
  };
}
