"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { accountSchema } from "@/app/lib/schema";

type CreateAccountDrawerProps = {
  children: React.ReactNode;
};

const CreateAccountDrawer = ({ children }: CreateAccountDrawerProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-black border-t border-teal-500">
        <DrawerHeader>
          <DrawerTitle className="text-white">Create New Account</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Main Checking"
                className="bg-gray-950 border-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="type"
                className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Account Type
              </label>
              <Select>
                <SelectTrigger
                  id="type"
                  className="bg-gray-950 border-gray-800 focus:border-teal-500"
                >
                  <SelectValue
                    className="placeholder:text-gray-400"
                    placeholder="Select type"
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-950 border border-gray-800 text-[#fafafa]">
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="balance"
                className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="bg-gray-950 border-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3">
              <div className="space-y-0.5">
                <label
                  htmlFor="isDefault"
                  className="text-base font-medium cursor-pointer text-white"
                >
                  Set as Default
                </label>
                <p className="text-sm text-gray-400">
                  This account will be selected by default for transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                className="data-[state=checked]:bg-teal-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-800 text-gray-950 hover:opacity-90"
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-500 text-white"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
