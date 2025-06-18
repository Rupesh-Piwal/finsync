import {
  Account,
  AccountType,
  Budget,
  RecurringInterval,
  TransactionType,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { CreateEmailResponse } from "resend";

export interface CreateAccountData {
  name: string;
  type: AccountType;
  balance: string;
  isDefault: boolean;
}

export interface AccountCardProps {
  account: Account;
}

export interface BudgetProgressProps {
  initialBudget: Budget | null;
  currentExpenses: number;
}

export interface AccountPageProps {
  params: Promise<{ id: string }>;
}
export interface TransactionLike extends Record<string, unknown> {
  id?: string;
  type?: TransactionType;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  amount?: Decimal; // Decimal type, not { toNumber(): number }
  balance?: Decimal;
  description?: string;
  date?: Date;
  category?: string;
  isRecurring?: boolean;
  recurringInterval?: string;
  nextRecurringDate?: Date; // Date, not string
  lastProcessed?: string;
  status?: string;
  accountId?: string;
  currency?: string;
  tags?: string[];
  receiptUrl?: string;
}

export interface FormInitialData {
  id?: string;
  type?: TransactionType; // Explicitly use TransactionType
  amount?: Decimal;
  description?: string;
  date?: Date;
  category?: string;
  isRecurring?: boolean;
  recurringInterval?: RecurringInterval;
  accountId?: string;
  // ... other properties you need
}
export interface CreateTransactionInput {
  accountId: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  isRecurring: boolean;
  recurringInterval?: RecurringInterval;
  type: TransactionType;
}

export interface SerializedTransaction {
  id: string;
  type: string;
  amount: number;
  balance?: number | Decimal;
  description?: string;
  date: Date | string; // serialized DateTime
  category: string;
  isRecurring: boolean;
  recurringInterval?: string;
  nextRecurringDate?: string;
  receiptUrl?: string | null;
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
    transactions: number | string;
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

export interface ResendEmailData {
  id: string;
  from: string;
  to: string[];
  created_at: string;
}

export interface SendEmailResponse {
  success: boolean;
  data?: CreateEmailResponse;
  error?: Error | unknown;
}

export interface SendEmailProps {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
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

export interface TransactionDue {
  lastProcessed?: Date | null;
  nextRecurringDate: Date | string | null;
}

export interface Stats {
  totalIncome: number | Decimal;
  totalExpenses: number | Decimal;
  byCategory: Record<string, number | Decimal>;
}

export interface MonthlyStats {
  totalExpenses: number;
  totalIncome: number;
  byCategory: Record<string, number>;
  transactionCount: number;
}
