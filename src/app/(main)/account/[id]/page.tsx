import { getAccountWithTransactions } from "@/lib/actions/account";
import {
  AccountPageProps,
  SerializedAccount,
  SerializedTransaction,
} from "@/types";
import { notFound } from "next/navigation";
import React from "react";

type AccountData = {
  transactions: SerializedTransaction[];
} & SerializedAccount;

const Account = async ({ params }: AccountPageProps) => {
  const accountData: AccountData | null = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;
  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
