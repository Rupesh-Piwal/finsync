"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { TransactionFormData, transactionSchema } from "@/app/lib/schema";
import { Account, Transaction } from "@prisma/client";
import useFetch from "@/hooks/use-fetch";
import CreateAccountDrawer from "@/components/create-account-drawer";
import {
  createTransaction,
  updateTransaction,
} from "@/lib/actions/transactions";
import { Category, CreateTransactionInput, ScannedData } from "@/types";
import { ReceiptScanner } from "./receipt-scanner";

type RecurringInterval = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}: {
  accounts: Account[];
  categories: Category[];
  editMode: boolean;
  initialData?: Transaction | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description ?? undefined,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval ?? undefined,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id ?? "",
            category: "",
            date: new Date(),
            isRecurring: false,
            recurringInterval: undefined,
          },
  });

  const {
    loading: updateLoading,
    fn: updateFn,
    data: updateResult,
  } = useFetch(updateTransaction);

  const {
    loading: createLoading,
    fn: createFn,
    data: createResult,
  } = useFetch(createTransaction);

  const transactionLoading = editMode ? updateLoading : createLoading;
  const transactionResult = editMode ? updateResult : createResult;

  const onSubmit = (data: TransactionFormData) => {
    // Transform the form data to match CreateTransactionInput
    const formData: CreateTransactionInput = {
      accountId: data.accountId,
      amount: parseFloat(data.amount),
      category: data.category,
      date: data.date.toISOString(), // or just data.date if you want Date type
      description: data.description,
      isRecurring: data.isRecurring,
      recurringInterval: data.recurringInterval,
      type: data.type,
    };

    if (editMode) {
      if (!editId) {
        console.error("editId is required in edit mode");
        return;
      }
      updateFn(editId, formData);
    } else {
      createFn(formData);
    }
  };

  const handleScanComplete = (data: unknown) => {
    if (
      typeof data === "object" &&
      data !== null &&
      "amount" in data &&
      "date" in data
    ) {
      const scannedData = data as ScannedData;

      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));

      if (scannedData.description) {
        setValue("description", scannedData.description);
      }

      if (scannedData.category) {
        setValue("category", scannedData.category);
      }

      toast.success("Receipt scanned successfully");
    } else {
      toast.error("Scanned data format is invalid.");
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode]);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto space-y-8 px-4 py-8 md:p-8 bg-[#111111] rounded-2xl shadow-2xl border border-gray-800"
    >
      <div className="text-center pb-6 border-b border-gray-800">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          {editMode ? "Update Transaction" : "Create Transaction"}
        </h2>
        <p className="text-gray-400 mt-2">
          Manage your financial records with ease
        </p>
      </div>

      {!editMode && <ReceiptScanner onScanComplete={handleScanComplete} />}

      <div className="bg-gradient-to-br from-[#1b1b1b] to-gray-[#1c1c1c] backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <label className="block text-lg font-semibold text-gray-100 mb-4">
          Transaction Type
        </label>
        <Select
          onValueChange={(value: "INCOME" | "EXPENSE") =>
            setValue("type", value)
          }
          defaultValue={type}
        >
          <SelectTrigger className="w-full h-14 bg-[#111111] border-gray-800 text-gray-100 hover:bg-gray-800/70 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200">
            <SelectValue
              placeholder="Select transaction type"
              className="text-gray-300"
            />
          </SelectTrigger>
          <SelectContent className="bg-[#111111] border-gray-800">
            <SelectItem
              value="EXPENSE"
              className="text-gray-100 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:text-teal-400"
            >
              💸 Expense
            </SelectItem>
            <SelectItem
              value="INCOME"
              className="text-gray-100 hover:bg-gray-950/10 focus:bg-gray-800/70 focus:text-teal-400"
            >
              💰 Income
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            {errors.type.message}
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-[#1b1b1b] to-gray-[#1c1c1c] backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <label className="block text-lg font-semibold text-gray-100 mb-4">
            Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-teal-400 font-bold text-lg">
              $
            </span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="h-14 pl-10 bg-[#111111] border-gray-800 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-lg font-medium transition-all duration-200"
              {...register("amount")}
            />
          </div>
          {errors.amount && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              {errors.amount.message}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-[#1b1b1b] to-gray-[#1c1c1c] backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <label className="block text-lg font-semibold text-gray-100 mb-4">
            Account
          </label>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}
          >
            <SelectTrigger className="w-full h-14 bg-[#111111] border-gray-800 text-gray-100 hover:bg-gray-800/70 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-gray-800">
              {accounts.map((account) => (
                <SelectItem
                  key={account.id}
                  value={account.id}
                  className="text-gray-100 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:text-teal-400"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{account.name}</span>
                    <span className="text-teal-400 font-medium ml-2">
                      ${Number(account.balance).toFixed(2)}
                    </span>
                  </div>
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button
                  variant="ghost"
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-3 px-4 text-sm outline-none hover:bg-gray-800/70 hover:text-teal-400 text-gray-300 transition-colors duration-200"
                >
                  <span className="text-teal-400 mr-2">+</span>
                  Create New Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              {errors.accountId.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-[#1b1b1b] to-gray-[#1c1c1c] backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <label className="block text-lg font-semibold text-gray-100 mb-4">
            Category
          </label>
          <Select
            onValueChange={(value) => setValue("category", value)}
            defaultValue={getValues("category")}
          >
            <SelectTrigger className="w-full h-14 bg-[#111111] border-gray-800 text-gray-100 hover:bg-gray-800/70 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-gray-800">
              {filteredCategories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                  className="text-gray-100 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:text-teal-400"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-[#1b1b1b] to-gray-[#1c1c1c] backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <label className="block text-lg font-semibold text-gray-100 mb-4">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 justify-start text-left font-medium bg-[#111111] border-gray-800 text-gray-100 hover:bg-gray-800/70 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200",
                  !date && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-3 h-5 w-5 text-teal-400" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-[#111111] border-gray-800"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  if (date instanceof Date) {
                    setValue("date", date);
                  }
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="bg-[#111111] text-gray-100"
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              {errors.date.message}
            </p>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1b1b1b] to-gray-[#1c1c1c] backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <label className="block text-lg font-semibold text-gray-100 mb-4">
          Description
        </label>
        <Input
          placeholder="Enter transaction description..."
          {...register("description")}
          className="w-full h-14 bg-[#111111] border-gray-800 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200"
        />
        {errors.description && (
          <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Recurring Toggle - Enhanced Card */}
      <div className="bg-gradient-to-br from-[#1b1b1b] to-gray-[#1c1c1c] backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <label className="text-lg font-semibold text-gray-100 flex items-center gap-3">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></span>
              Recurring Transaction
            </label>
            <div className="text-gray-400 text-sm ml-5">
              Set up a recurring schedule for this transaction
            </div>
          </div>
          <Switch
            checked={isRecurring}
            onCheckedChange={(checked) => setValue("isRecurring", checked)}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-teal-500 data-[state=checked]:to-cyan-500 scale-110"
          />
        </div>
      </div>

      {isRecurring && (
        <div className="bg-[#111111] backdrop-blur-sm rounded-xl p-6 border border-gray-800 animate-in slide-in-from-top-2 duration-300">
          <label className="block text-lg font-semibold text-gray-100 mb-4">
            Recurring Interval
          </label>
          <Select
            onValueChange={(value) =>
              setValue("recurringInterval", value as RecurringInterval)
            }
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger className="w-full h-14 bg-[#1a1a1a] border-gray-800 text-gray-100 hover:bg-gray-800/70 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200">
              <SelectValue placeholder="Select recurring interval" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-gray-800">
              <SelectItem
                value="DAILY"
                className="text-gray-100 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:text-teal-400"
              >
                📅 Daily
              </SelectItem>
              <SelectItem
                value="WEEKLY"
                className="text-gray-100 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:text-teal-400"
              >
                📊 Weekly
              </SelectItem>
              <SelectItem
                value="MONTHLY"
                className="text-gray-100 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:text-teal-400"
              >
                🗓️ Monthly
              </SelectItem>
              <SelectItem
                value="YEARLY"
                className="text-gray-100 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:text-teal-400"
              >
                📆 Yearly
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

      <div className="flex gap-6 pt-8">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-14 border-2 border-gray-800 bg-[#111111] text-gray-300 hover:bg-gray-800/70 hover:text-gray-100 hover:border-gray-700 transition-all duration-200 font-medium"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 h-14 bg-gradient-to-r from-teal-800 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-200 transform hover:scale-[1.02]"
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? (
            <>
              <span className="mr-2">✏️</span>
              Update Transaction
            </>
          ) : (
            <>
              <span className="mr-2">✨</span>
              Create Transaction
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
