"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SerializedAccount, SerializedTransaction } from "@/types";

const COLORS = [
  "#FF6B9D",
  "#5B8DEF",
  "#A855F7",
  "#F97316",
  "#10D9C4",
  "#22C55E",
  "#EAB308",
  "#FF4081",
  "#00F5FF",
  "#00BCD4",
];

type DashboardOverviewProps = {
  accounts: SerializedAccount[];
  transactions: SerializedTransaction[];
};

export function DashboardOverview({
  accounts,
  transactions,
}: DashboardOverviewProps) {
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const expensesByCategory = currentMonthExpenses.reduce<
    Record<string, number>
  >((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <div className="min-h-screen  md:p-6 mb-4 md:my-1">
      <div className="grid gap-6 md:grid-cols-2 max-w-7xl mx-auto">
        <Card className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-md border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-teal-900/20 hover:border-teal-900/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-slate-700/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-teal-400" />
              </div>
              <CardTitle className="text-[14px] md:text-lg font-semibold text-slate-100">
                Recent Transactions
              </CardTitle>
            </div>
            <Select
              value={selectedAccountId}
              onValueChange={setSelectedAccountId}
            >
              <SelectTrigger className="w-[160px] bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-700 focus:ring-teal-500 focus:border-teal-500 transition-colors">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {accounts.map((account) => (
                  <SelectItem
                    key={account.id}
                    value={account.id}
                    className="text-slate-200 focus:bg-slate-700 focus:text-teal-400"
                  >
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-5">
              {recentTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <Calendar className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium">No recent transactions</p>
                  <p className="text-sm opacity-75">
                    Transactions will appear here
                  </p>
                </div>
              ) : (
                recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="group flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-700/20 hover:border-teal-500/30"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          transaction.type === "EXPENSE"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                        )}
                      >
                        {transaction.type === "EXPENSE" ? (
                          <ArrowDownRight className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                          {transaction.description || "Untitled Transaction"}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(transaction.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex items-center font-semibold text-lg",
                          transaction.type === "EXPENSE"
                            ? "text-red-400"
                            : "text-green-400"
                        )}
                      >
                        <DollarSign className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="text-[14px] md:text-[18px]">
                          {transaction.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-md border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-teal-900/20 hover:border-teal-900/30">
          <CardHeader className="border-b border-slate-700/30 pb-6">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg font-semibold text-slate-100">
                Monthly Expense Breakdown
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {pieChartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <DollarSign className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">No expenses this month</p>
                <p className="text-sm opacity-75">
                  Start tracking your expenses
                </p>
              </div>
            ) : (
              <div className="h-[350px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="none"
                      label={({
                        name,
                        value,
                      }: {
                        name: string;
                        value: number;
                      }) => `${name}: $${value.toFixed(2)}`}
                      labelLine={false}
                    >
                      {pieChartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          className="hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toFixed(2)}`,
                        "Amount",
                      ]}
                      contentStyle={{
                        backgroundColor: "rgb(30 41 59)",
                        border: "1px solid rgb(51 65 85)",
                        borderRadius: "12px",
                        color: "rgb(226 232 240)",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }}
                      labelStyle={{
                        color: "rgb(148 163 184)",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: "20px",
                        fontSize: "14px",
                        color: "rgb(148 163 184)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
