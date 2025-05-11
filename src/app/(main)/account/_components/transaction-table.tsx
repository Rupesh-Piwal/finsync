"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TransactionTableProps } from "@/types";
import { format } from "date-fns";
import { Clock, MoreHorizontal, RefreshCw } from "lucide-react";
import { useState } from "react";

const RECURRING_INTERVALS: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="bg-[#0d0d0d]/80 backdrop-blur-md shadow-inner shadow-black/20 text-gray-100 rounded-2xl p-4">
      {/* Transactions Table */}
      <div className="border border-gray-800 rounded overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
            <TableRow className="border-b border-gray-700 hover:bg-gray-800">
              <TableHead className="w-12 text-teal-400">
                <Checkbox className="border-teal-500 focus:ring-2 focus:ring-teal-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500" />
              </TableHead>
              <TableHead className="cursor-pointer text-teal-400 font-semibold">
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                </div>
              </TableHead>
              <TableHead className="text-teal-400 font-semibold">
                Description
              </TableHead>
              <TableHead className="cursor-pointer text-teal-400 font-semibold">
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right text-teal-400 font-semibold">
                <div className="flex items-center justify-end space-x-1">
                  <span>Amount</span>
                </div>
              </TableHead>
              <TableHead className="text-teal-400 font-semibold">
                Recurring
              </TableHead>
              <TableHead className="w-12 text-teal-400" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="border-b border-gray-800 hover:bg-gray-800/30 hover:shadow-lg hover:shadow-black/10 transition-all duration-200"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(Number(transaction.id))}
                    onCheckedChange={() => handleSelect(Number(transaction.id))}
                    className="border-gray-600 focus:ring-2 focus:ring-teal-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                  />
                </TableCell>
                <TableCell className="text-gray-300 text-sm">
                  {format(new Date(transaction.date), "PP")}
                </TableCell>
                <TableCell className="font-medium text-gray-200 text-sm">
                  {transaction.description}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="rounded-full bg-gray-900/60 text-gray-300 border-gray-700 px-3 py-1 text-xs font-medium tracking-wide"
                  >
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-medium text-sm",
                    transaction.type === "EXPENSE"
                      ? "text-red-400"
                      : "text-green-400"
                  )}
                >
                  {transaction.type === "EXPENSE" ? "-" : "+"}$
                  {transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  {transaction.isRecurring ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge
                            variant="secondary"
                            className="gap-1 bg-teal-900/60 text-teal-300 border border-teal-800 hover:bg-teal-800/60 rounded-full px-2 py-1 text-xs"
                          >
                            <RefreshCw className="h-3 w-3" />
                            {
                              RECURRING_INTERVALS[
                                transaction.recurringInterval ?? ""
                              ]
                            }
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1e1e1e] border border-gray-700 text-gray-100 shadow-md shadow-black/30 rounded-md p-3 text-sm">
                          <div className="text-sm">
                            <div className="font-medium text-teal-400 mb-1">
                              Next Payment:
                            </div>
                            <div>
                              {format(
                                new Date(transaction.nextRecurringDate ?? ""),
                                "PPP"
                              )}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Badge
                      variant="outline"
                      className="gap-1 border-gray-700 text-gray-400 rounded-full px-2 py-1 text-xs"
                    >
                      <Clock className="h-3 w-3" />
                      One-time
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-full"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-[#1a1a1a] border border-gray-700 text-gray-200 shadow-lg shadow-black/40 rounded-lg"
                    >
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem className="text-red-400 hover:bg-gray-800 hover:text-red-300 cursor-pointer">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
