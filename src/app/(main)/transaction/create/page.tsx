import { getUserAccounts } from "@/lib/actions/dashboard";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/lib/actions/transactions";
import { AddTransactionPageProps } from "@/types";
import { defaultCategories } from "../../../../../data/categories";
import { Decimal } from "@prisma/client/runtime/library";
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

  const decimalAccounts = accounts.map((a) => ({
    ...a,
    balance: new Decimal(a.balance),
  }));

  const safeIntialData = initialData ? rehydrateTransaction(initialData) : null;

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={decimalAccounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={safeIntialData}
      />
    </div>
  );
}
