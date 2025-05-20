import AddTransactionForm from "../_components/transaction-form";

const AddTransactionPage = () => {
  //TODO: GET USER-ACCOUNT DATA.

  //TODO:

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl text-teal-600 ">Add Transaction</h1>
      </div>
      <AddTransactionForm />
    </div>
  );
};

export default AddTransactionPage;
