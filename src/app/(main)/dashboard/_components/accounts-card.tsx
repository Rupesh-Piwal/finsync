"use client";

import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect, MouseEvent } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useFetch } from "@/hooks/use-fetch";
import { updateDefaultAccount } from "@/lib/actions/account";
import { SerializedAccount } from "@/types";

interface AccountCardProps {
  account: SerializedAccount;
}

export function AccountCard({ account }: AccountCardProps) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }
    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  const gradientClass =
    type === "CURRENT"
      ? "from-teal-900/20 to-gray-900"
      : "from-teal-800/20 to-slate-900/80";

  return (
    <Card className="relative group bg-gradient-to-br border border-teal-900/90 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden text-gray-100 dark:text-white">
      <div className="absolute inset-0 bg-gradient-to-br opacity-90 z-0 pointer-events-none"></div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-95 z-0`}
      />
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-500/20 rounded-full blur-xl z-0" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-600/10 rounded-full blur-xl z-0" />

      
      <Link href={`/account/${id}`} className="relative z-10 block">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-gray-700/30">
          <div className="flex items-center space-x-2">
            {isDefault && (
              <Star className="h-4 w-4 text-teal-400 fill-teal-400" />
            )}
            <CardTitle className="text-sm font-medium capitalize">
              {name}
            </CardTitle>
          </div>
          <div className="flex items-center">
            <span className="text-xs mr-2 text-teal-400 font-medium">
              {isDefault ? "Default" : "Set Default"}
            </span>
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-teal-500"
            />
          </div>
        </CardHeader>

        <CardContent className="pt-6 pb-4">
          <div className="text-3xl font-bold tracking-tight mb-1 flex items-baseline">
            <span className="text-lg mr-1 text-teal-400">$</span>
            {balance.toFixed(2)}
          </div>
          <div className="flex items-center">
            <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-teal-500/20 text-teal-300 mr-2">
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </span>
            <p className="text-xs text-gray-400">Account</p>
          </div>
        </CardContent>

        <div className="h-0.5 mx-4 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

        <CardFooter className="flex justify-between py-4 text-sm text-gray-400">
          <div className="flex items-center group-hover:text-teal-300 transition-colors">
            <div className="p-1 rounded-full bg-teal-900/50 mr-2">
              <ArrowUpRight className="h-3 w-3 text-teal-400" />
            </div>
            Income
          </div>
          <div className="flex items-center group-hover:text-teal-300 transition-colors">
            <div className="p-1 rounded-full bg-red-900/30 mr-2">
              <ArrowDownRight className="h-3 w-3 text-red-400" />
            </div>
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
