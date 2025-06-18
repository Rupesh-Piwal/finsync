import { Decimal } from "@prisma/client/runtime/library";
import { SerializedTransaction } from "@/types";

export function rehydrateTransaction(transaction: SerializedTransaction) {
  return {
    ...transaction,
    amount: new Decimal(transaction.amount),
  };
}
