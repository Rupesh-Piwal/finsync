import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard, BadgePlus } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Logo } from "./ui/logo";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <SignedOut></SignedOut>
        </div>

        
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="transition-all duration-200 hover:scale-105"
            >
              <Button
                variant="outline"
                className="bg-emerald-900/60 text-emerald-100 border-emerald-700 hover:bg-emerald-800 hover:text-emerald-50 hover:border-emerald-600"
              >
                <LayoutDashboard size={18} className="text-emerald-300" />
                <span className="hidden md:inline ml-2">Dashboard</span>
              </Button>
            </Link>
            <a
              href="/transaction/create"
              className="transition-all duration-200 hover:scale-105"
            >
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-emerald-50 flex items-center gap-2 border-0">
                <span className="hidden md:inline">Add Transaction</span>
                <BadgePlus size={18} />
              </Button>
            </a>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-emerald-50 border-0 shadow-md shadow-emerald-900/30 transition-all hover:shadow-lg hover:shadow-emerald-900/20">
                Login
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-emerald-300 ring-offset-2 ring-offset-emerald-900",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
