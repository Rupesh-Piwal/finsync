import CreateAccountDrawer from "@/components/create-account-drawer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React from "react";

const AddTransactionForm = () => {
  return (
    <form>
      {/* Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
        {/* {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )} */}
      </div>

      {/* Amount and Account */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input type="number" step="0.01" placeholder="0.00" />
          {/* {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )} */}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Account</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {/* {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name} (${parseFloat(account.balance).toFixed(2)})
                </SelectItem>
              ))} */}
              <CreateAccountDrawer>
                <Button
                  variant="ghost"
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                >
                  Create Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {/* {errors.accountId && (
            <p className="text-sm text-red-500">{errors.accountId.message}</p>
          )} */}
        </div>
      </div>
      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {/* {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))} */}
          </SelectContent>
        </Select>
        {/* {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )} */}
      </div>

      {/* Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full pl-3 text-left font-normal")}
            >
              {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              //   selected={date}
              //   onSelect={(date) => setValue("date", date)}
              //   disabled={(date) =>
              //     date > new Date() || date < new Date("1900-01-01")
              //   }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {/* {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )} */}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input placeholder="Enter description" />
        {/* {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )} */}
      </div>

      {/* Recurring Toggle */}
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <label className="text-base font-medium">Recurring Transaction</label>
          <div className="text-sm text-muted-foreground">
            Set up a recurring schedule for this transaction
          </div>
        </div>
        <Switch />
      </div>

      {/* Recurring Interval */}
      {/* {isRecurring && ( */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Recurring Interval</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DAILY">Daily</SelectItem>
            <SelectItem value="WEEKLY">Weekly</SelectItem>
            <SelectItem value="MONTHLY">Monthly</SelectItem>
            <SelectItem value="YEARLY">Yearly</SelectItem>
          </SelectContent>
        </Select>
        {/* {errors.recurringInterval && (
            <p className="text-sm text-red-500">
              {errors.recurringInterval.message}
            </p>
          )} */}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button type="button" variant="outline" className="w-full">
          Cancel
        </Button>
        <Button type="submit" className="w-full">
          {/* {transactionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )} */}
        </Button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
