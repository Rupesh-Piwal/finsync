import { getAccountWithTransactions } from "@/lib/actions/account";
import {
  AccountPageProps,
  SerializedAccount,
  SerializedTransaction,
} from "@/types";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import TransactionTable from "../_components/transaction-table";
import { CreditCard, ArrowUpDown } from "lucide-react";

type AccountData = {
  transactions: SerializedTransaction[];
} & SerializedAccount;

const Account = async ({ params }: AccountPageProps) => {
  const accountData: AccountData | null = await getAccountWithTransactions(
    params.id
  );

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-7xl mx-auto px-1.5 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Header Section with Account Details */}
        <div className="bg-gradient-to-br from-[#1b1b1b] to-gray-[#1c1c1c] rounded-2xl p-6 shadow-lg border border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-teal-900/60 p-3 rounded-lg">
                <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-teal-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 text-transparent bg-clip-text capitalize">
                  {account.name}
                </h1>
                <p className="text-gray-400 flex items-center mt-1">
                  <span className="capitalize">
                    {account.type.toLowerCase()}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <ArrowUpDown className="h-3 w-3 mr-1 text-emerald-400" />
                    <span className="text-white pr-1">
                      {account._count.transactions}
                    </span>
                    Transaction
                    {account._count.transactions !== 1 && "s"}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-gray-900/60 p-4 rounded-xl md:self-stretch flex flex-col justify-center">
              <p className="text-gray-400 text-sm font-medium pb-2">
                Current Balance
              </p>
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                ${account.balance.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table Section */}
        <div className="bg-[#111111] px-1.5 py-6 md:p-6 rounded-2xl border border-gray-800 shadow-lg">
          <h2 className="text-xl font-bold text-teal-400 mb-6 flex items-center pl-3">
            Transaction History
          </h2>

          <Suspense
            fallback={
              <div className="flex justify-center py-10">
                <BarLoader color="#5eead4" width={200} />
              </div>
            }
          >
            <TransactionTable transactions={transactions} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Account;
