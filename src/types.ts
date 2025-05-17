import { Account, AccountType, Budget } from "@prisma/client";

export interface CreateAccountData {
  name: string;
  type: AccountType;
  balance: string;
  isDefault: boolean;
}

export interface AccountCardProps {
  account: Account;
}

export interface AccountPageProps {
  params: {
    id: string;
  };
}

export interface TransactionLike {
  [key: string]: any;
  balance?: { toNumber(): number };
  amount?: { toNumber(): number };
}

export interface SerializedTransaction {
  id: string;
  type: string;
  amount: number;
  balance?: number;
  description?: string;
  date: string; // serialized DateTime
  category: string;
  isRecurring: boolean;
  recurringInterval?: string;
  nextRecurringDate?: string;
  lastProcessed?: string;
  status: string;
  userId: string;
  accountId: string;
  currency: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SerializedAccount extends Omit<Account, "balance"> {
  balance: number;
  _count: {
    transactions: number;
  };
}

export interface AccountData extends SerializedAccount {
  transactions: SerializedTransaction[];
}

export interface TransactionTableProps {
  transactions: SerializedTransaction[];
}

export interface BulkDeleteResult {
  success: boolean;
  error?: string;
}

interface BudgetProgressProps {
  initialBudget: Budget | null;
  currentExpenses: number;
}
