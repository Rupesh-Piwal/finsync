import { Account, AccountType } from "@prisma/client";

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
  [key: string]: any;
  balance?: number;
  amount?: number;
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
