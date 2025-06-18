"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";

import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/lib/actions/budget";
import useFetch from "@/hooks/use-fetch";
import { BudgetProgressProps } from "@/types";

interface Budget {
  amount: number;
  id?: string;
  name?: string;
  category?: string;
  period?: "monthly" | "weekly" | "yearly";
  createdAt?: Date;
  updatedAt?: Date;
}

export function BudgetProgress({
  initialBudget,
  currentExpenses,
}: BudgetProgressProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newBudget, setNewBudget] = useState<string>(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed: number = initialBudget
    ? (currentExpenses / initialBudget.amount.toNumber()) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount); // ✅ just pass number
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-md border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-teal-900/20 hover:border-teal-900/30 mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium text-gray-200">
            Monthly Budget (Default Account)
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32 bg-gray-800/50 border-gray-700 text-gray-200"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-300"
                >
                  <Check className="h-4 w-4 text-emerald-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="bg-rose-500/10 hover:bg-rose-500/20 transition-all duration-300"
                >
                  <X className="h-4 w-4 text-rose-400" />
                </Button>
              </div>
            ) : (
              <>
                <div className="text-gray-400 text-sm">
                  {initialBudget
                    ? `$${currentExpenses.toFixed(
                        2
                      )} of $${initialBudget.amount.toFixed(2)} spent`
                    : "No budget set"}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6 bg-teal-800/30 hover:bg-teal-700/50 transition-all duration-300"
                >
                  <Pencil className="h-3 w-3 text-gray-400" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className="space-y-2">
            <div className="h-2 w-full bg-gray-800/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  percentUsed >= 90
                    ? "bg-gradient-to-r from-rose-400 to-rose-500"
                    : percentUsed >= 65
                      ? "bg-gradient-to-r from-amber-400 to-amber-500"
                      : "bg-gradient-to-r from-emerald-300 to-emerald-500"
                }`}
                style={{ width: `${percentUsed}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <p
                className={`text-xs font-bold ${
                  percentUsed >= 90
                    ? "bg-gradient-to-r from-rose-400 to-rose-500 text-transparent bg-clip-text"
                    : percentUsed >= 75
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text"
                      : "bg-gradient-to-r from-emerald-300 to-emerald-500 text-transparent bg-clip-text"
                }`}
              >
                <span className="text-gray-400">Budget remaining</span> (
                {(100 - percentUsed).toFixed(1)}%)
              </p>

              <p
                className={`text-sm font-bold ${
                  percentUsed >= 90
                    ? "bg-gradient-to-r from-rose-400 to-rose-500 text-transparent bg-clip-text"
                    : percentUsed >= 75
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text"
                      : "bg-gradient-to-r from-emerald-300 to-emerald-500 text-transparent bg-clip-text"
                }`}
              >
                ${(initialBudget.amount.toNumber() - currentExpenses).toFixed(2)}
                <span className="text-xs ml-1 font-normal text-gray-400 ">
                  ({percentUsed.toFixed(1)}%)
                </span>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
