import { getUserAccounts } from "@/lib/actions/dashboard";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/lib/actions/transactions";
import { AddTransactionPageProps } from "@/types";
import { defaultCategories } from "../../../../../data/categories";
import { rehydrateTransaction } from "@/app/lib/rehydrate";

export default async function AddTransactionPage({
  searchParams,
}: AddTransactionPageProps) {
  const accounts = await getUserAccounts();
  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  const serializedAccounts = accounts.map((account) => ({
    ...account,
    balance: Number(account.balance),
  }));

  const safeInitialData = initialData
    ? rehydrateTransaction(initialData)
    : null;

  return (
    <div className="min-h-screen bg-[#111111] relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-1 md:px-6 py-12 lg:px-8">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent md:mb-4 tracking-tight">
              {!!editId ? "Edit Transaction" : "Add Transaction"}
            </h1>
          </div>
        </div>

        <div className="relative">
          <div className="relative bg-[#1b1b1b] backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl md:py-5 p-1 md:px-0">
            <AddTransactionForm
              accounts={serializedAccounts} 
              categories={defaultCategories}
              editMode={!!editId}
              initialData={safeInitialData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
