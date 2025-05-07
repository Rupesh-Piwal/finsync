import { Decimal } from "@prisma/client/runtime/library";
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



// export interface Account {
//   id: string;
//   name: string;
//   type: AccountType;
//   balance: Decimal;
//   isDefault: boolean;
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   transactions?: any;
// }

export interface SerializedAccount extends Omit<Account, "balance"> {
  balance: number;
}
