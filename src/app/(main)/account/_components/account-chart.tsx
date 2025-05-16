"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionTableProps } from "@/types";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  ChartBar,
} from "lucide-react";

type GroupedTransaction = {
  date: string;
  income: number;
  expense: number;
};

type DateRangeKey = keyof typeof DATE_RANGES;

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

export function AccountChart({ transactions }: TransactionTableProps) {
  const [dateRange, setDateRange] = useState<DateRangeKey>("7D");

  const filteredData = useMemo((): GroupedTransaction[] => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    // Filter transactions within date range
    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    // Group transactions by date
    const grouped = filtered.reduce<Record<string, GroupedTransaction>>(
      (acc, transaction) => {
        const date = format(new Date(transaction.date), "MMM dd");
        if (!acc[date]) {
          acc[date] = { date, income: 0, expense: 0 };
        }
        if (transaction.type === "INCOME") {
          acc[date].income += transaction.amount;
        } else {
          acc[date].expense += transaction.amount;
        }
        return acc;
      },
      {}
    );

    // Convert to array and sort by date
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [transactions, dateRange]);

  // Calculate totals for the selected period
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <Card className="bg-[#111111] border border-gray-800 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 rounded-2xl"></div>

      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 pb-5 relative z-10">
        <div className="flex items-center">
          <div className="bg-teal-500/10 p-2 rounded-lg mr-3">
            <ChartBar className="h-5 w-5 text-teal-400" />
          </div>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-teal-300 to-emerald-400 text-transparent bg-clip-text">
            Transaction Overview
          </CardTitle>
        </div>
        <Select
          defaultValue={dateRange}
          onValueChange={(value: string) => {
            if (value in DATE_RANGES) {
              setDateRange(value as DateRangeKey);
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-[160px] bg-gray-900/70 backdrop-blur-md border-gray-800/80 text-gray-100 hover:bg-gray-800/80 focus:ring-1 focus:ring-teal-400/70 rounded-lg shadow-md">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900/95 backdrop-blur-md border border-gray-800/80 text-gray-100 rounded-lg shadow-xl">
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem
                key={key}
                value={key}
                className="hover:bg-gray-800/80 focus:bg-gray-800/80 hover:text-teal-300 transition-colors duration-200"
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="pt-2 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/40 backdrop-blur-md p-5 rounded-xl border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-teal-900/20 hover:border-teal-900/30 group flex flex-col items-center">
            <div className="bg-emerald-500/10 p-2 rounded-full mb-2 group-hover:bg-emerald-500/20 transition-all duration-300">
              <ArrowUpCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">
              Total Income
            </p>
            <p className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-500 text-transparent bg-clip-text">
              ${totals.income.toFixed(2)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/40 backdrop-blur-md p-5 rounded-xl border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-rose-900/20 hover:border-rose-900/30 group flex flex-col items-center">
            <div className="bg-rose-500/10 p-2 rounded-full mb-2 group-hover:bg-rose-500/20 transition-all duration-300">
              <ArrowDownCircle className="h-5 w-5 text-rose-400" />
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">
              Total Expenses
            </p>
            <p className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-rose-500 text-transparent bg-clip-text">
              ${totals.expense.toFixed(2)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/40 backdrop-blur-md p-5 rounded-xl border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-teal-900/20 hover:border-teal-900/30 group flex flex-col items-center">
            <div
              className={`p-2 rounded-full mb-2 group-hover:bg-opacity-30 transition-all duration-300 ${
                totals.income - totals.expense >= 0
                  ? "bg-emerald-500/10 group-hover:bg-emerald-500/20"
                  : "bg-rose-500/10 group-hover:bg-rose-500/20"
              }`}
            >
              <BarChart3
                className={`h-5 w-5 ${
                  totals.income - totals.expense >= 0
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              />
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">
              Net Balance
            </p>
            <p
              className={`text-2xl font-bold ${
                totals.income - totals.expense >= 0
                  ? "bg-gradient-to-r from-emerald-300 to-emerald-500 text-transparent bg-clip-text"
                  : "bg-gradient-to-r from-rose-400 to-rose-500 text-transparent bg-clip-text"
              }`}
            >
              ${Math.abs(totals.income - totals.expense).toFixed(2)}
              <span className="text-sm ml-1 font-normal text-gray-400">
                {totals.income - totals.expense >= 0 ? "profit" : "loss"}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-lg h-[310px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 15, left: 15, bottom: 5 }}
            >
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f87171" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#333"
                strokeOpacity={0.3}
              />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9ca3af" }}
                dy={10}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                tick={{ fill: "#9ca3af" }}
                dx={-5}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, undefined]}
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.95)",
                  border: "1px solid rgba(55, 65, 81, 0.5)",
                  borderRadius: "0.5rem",
                  color: "#f9fafb",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  backdropFilter: "blur(8px)",
                }}
                labelStyle={{ color: "#d1d5db", fontWeight: "bold" }}
                cursor={{ fill: "rgba(75, 85, 99, 0.1)" }}
              />
              <Legend
                wrapperStyle={{ color: "#9ca3af", paddingTop: "10px" }}
                iconType="circle"
                iconSize={10}
              />
              <Bar
                dataKey="income"
                name="Income"
                fill="url(#incomeGradient)"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="url(#expenseGradient)"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
