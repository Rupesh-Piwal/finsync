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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { bulkDeleteTransactions } from "@/lib/actions/account";
import { cn } from "@/lib/utils";
import { TransactionTableProps } from "@/types";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import { categoryColors } from "../../../../../data/categories";
import useFetch from "@/hooks/use-fetch";

const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS: Record<string, string> = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Memoized filtered and sorted transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter((transaction) =>
        (transaction.description ?? "")
          .toLowerCase()

          .includes(searchLower)
      );
    }

    // Apply type filter
    if (typeFilter) {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }

    // Apply recurring filter
    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter === "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();

          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / ITEMS_PER_PAGE
  );
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedTransactions, currentPage]);

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === paginatedTransactions.length
        ? []
        : paginatedTransactions.map((t) => t.id)
    );
  };

  const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deleted,
  } = useFetch(bulkDeleteTransactions);

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} transactions?`
      )
    )
      return;

    deleteFn(selectedIds);
  };

  useEffect(() => {
    if (deleted && !deleteLoading) {
      toast.error("Transactions deleted successfully");
    }
  }, [deleted, deleteLoading]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedIds([]); // Clear selections on page change
  };

  const handleSort = (field: string) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="backdrop-blur-md shadow-inner shadow-black/20 text-gray-100 rounded-2xl md:p-2">
      {deleteLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
      )}

      {/* Filters */}

      <div className="flex flex-col gap-4 p-4 sm:p-6 mb-3 bg-gradient-to-br from-[#1b1b1b] to-[#1c1c1c] rounded-xl border border-gray-800 shadow-lg">
        {/* Search Bar - Full width on mobile */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-teal-400" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 w-full bg-[#111111] border-gray-800 text-gray-100 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 rounded-md h-10"
          />
        </div>

        {/* Filters - Wrap on mobile, row on desktop */}
        <div className="flex flex-wrap gap-3">
          <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[140px] bg-[#111111] border-gray-800 hover:text-white text-white hover:bg-gray-800/70 focus:ring-1 focus:ring-teal-400">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border border-gray-800 text-gray-100">
              <SelectItem
                value="INCOME"
                className="hover:bg-gray-800/70 focus:bg-gray-800/70 text-emerald-400 hover:text-gray-400"
              >
                Income
              </SelectItem>
              <SelectItem
                value="EXPENSE"
                className="hover:bg-gray-800/70 focus:bg-gray-800/70 text-teal-400 hover:text-gray-400"
              >
                Expense
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={recurringFilter}
            onValueChange={(value) => {
              setRecurringFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[160px] bg-[#111111] border-gray-800 text-gray-100 hover:text-white hover:bg-gray-800/70 focus:ring-1 focus:ring-teal-400">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border border-gray-800 text-gray-100">
              <SelectItem
                value="recurring"
                className="hover:bg-gray-800/70 focus:bg-gray-800/70"
              >
                Recurring Only
              </SelectItem>
              <SelectItem
                value="non-recurring"
                className="hover:bg-gray-800/70 focus:bg-gray-800/70"
              >
                Non-recurring Only
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters Button - Grows to fill available space on mobile */}
          {(searchTerm || typeFilter || recurringFilter) && (
            <div className="flex-grow sm:flex-grow-0 transition-all animate-in fade-in slide-in-from-right duration-300">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                title="Clear filters"
                className="w-full sm:w-auto bg-gradient-to-br from-gray-700/80 to-gray-800/80 border border-gray-700 hover:bg-gray-800 hover:border-teal-700 text-gray-200 hover:text-teal-400 rounded-lg shadow-sm hover:shadow flex items-center justify-center gap-2 px-3 py-2 h-9 text-sm transition-all duration-300"
              >
                <X className="h-3.5 w-3.5" />
                <span className="mr-1">Clear Filters</span>
              </Button>
            </div>
          )}
        </div>

        {/* Bulk Actions - Full width on mobile */}
        {selectedIds.length > 0 && (
          <div className="w-full transition-all animate-in fade-in duration-300">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              className="w-full sm:w-auto bg-gradient-to-r from-rose-500/70 to-red-500/70 hover:from-rose-500 hover:to-red-500 border-0 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
            >
              <div className="bg-white/20 p-1 rounded">
                <Trash className="h-3.5 w-3.5" />
              </div>
              <span>Delete Selected ({selectedIds.length})</span>
            </Button>
          </div>
        )}
      </div>

      {/* Transactions Table */}
      <div className="border border-gray-800 rounded overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
            <TableRow className="border-b border-gray-700 hover:bg-gray-800">
              <TableHead className="w-12 text-teal-400">
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  className="border-teal-500 focus:ring-2 focus:ring-teal-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
              </TableHead>

              <TableHead
                onClick={() => handleSort("date")}
                className="cursor-pointer text-teal-400 font-semibold"
              >
                <div className="flex items-center space-x-1">
                  Date
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-teal-400 font-semibold">
                Description
              </TableHead>
              <TableHead
                onClick={() => handleSort("category")}
                className="cursor-pointer text-teal-400 font-semibold"
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead
                onClick={() => handleSort("amount")}
                className="cursor-pointer text-right text-teal-400 font-semibold"
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>
                    Amount{" "}
                    {sortConfig.field === "amount" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </span>
                </div>
              </TableHead>

              <TableHead className="text-teal-400 font-semibold">
                Recurring
              </TableHead>

              <TableHead className="w-12 text-teal-400" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="border-b border-gray-800 hover:bg-gray-800/30 hover:shadow-lg hover:shadow-black/10 transition-all duration-200"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(transaction.id)}
                      onCheckedChange={() => handleSelect(transaction.id)}
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
                      style={{
                        backgroundColor: `${
                          categoryColors[transaction.category]
                        }20`, // 12% opacity
                        color: categoryColors[transaction.category],
                        borderColor: categoryColors[transaction.category],
                      }}
                      className="rounded-full px-3 py-1 text-xs font-medium tracking-wide"
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
                              className="rounded-full text-xs flex items-center gap-1.5 bg-teal-900/30 text-teal-400 border border-teal-700 hover:bg-teal-800/40"
                              variant="secondary"
                            >
                              <RefreshCw className="h-3 w-3 text-teal-400" />
                              {
                                RECURRING_INTERVALS[
                                  transaction.recurringInterval || ""
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-900/95 border-gray-800 text-gray-100">
                            <div className="text-sm">
                              <div className="font-medium text-teal-400">
                                Next Date:
                              </div>
                              <div>
                                {transaction.nextRecurringDate
                                  ? format(
                                      new Date(transaction.nextRecurringDate),
                                      "PPP"
                                    )
                                  : ""}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Badge
                        className="rounded-full text-xs flex items-center gap-1.5 bg-gray-800/40 text-gray-300 border border-gray-700 hover:bg-gray-800/60"
                        variant="outline"
                      >
                        <Clock className="h-3 w-3 text-gray-400" />
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
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                          className="hover:bg-gray-800 cursor-pointer"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem
                          onClick={() => deleteFn([transaction.id])}
                          className="text-red-400 hover:bg-gray-800 hover:text-red-300 cursor-pointer"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* PAGINATION  */}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-900/60 border-gray-800 text-gray-100 hover:bg-gray-800/70 hover:text-teal-400 focus:ring-1 focus:ring-teal-400 focus:border-teal-400 disabled:opacity-50 disabled:hover:bg-gray-900/60 disabled:hover:text-gray-400 h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm bg-gray-900/60 px-3 py-1.5 rounded-md border border-gray-800 text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-900/60 border-gray-800 text-gray-100 hover:bg-gray-800/70 hover:text-teal-400 focus:ring-1 focus:ring-teal-400 focus:border-teal-400 disabled:opacity-50 disabled:hover:bg-gray-900/60 disabled:hover:text-gray-400 h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
