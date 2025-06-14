import { Account, AccountType, Budget } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { ReactElement } from "react";

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
  balance?: number | Decimal;
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

export interface BudgetProgressProps {
  initialBudget: Budget | null;
  currentExpenses: number;
}

export interface SendEmailProps {
  to: string | string[];
  subject: string;
  react: ReactElement;
}

export interface SendEmailResponse {
  success: boolean;
  data?: any;
  error?: Error | unknown;
}

export interface AddTransactionPageProps {
  searchParams?: {
    edit?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  type: string;
}

export interface ScannedReceipt {
  amount: number;
  date: Date;
  description: string;
  merchantName: string;
  category: string;
}
export interface ScannedData {
  amount: number;
  date: string;
  description?: string;
  category?: string;
}
