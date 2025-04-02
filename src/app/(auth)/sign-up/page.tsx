import { GoogleSignIn } from "@/components/google-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
        <div className="relative">
          {/* Abstract design element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-lime-500/10 rounded-full blur-2xl -ml-6 -mb-6"></div>

          {/* Logo and Heading */}
          <div className="pt-8 pb-6 px-8 relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="h-10 w-10 rounded-full bg-lime-500 flex items-center justify-center">
                <span className="text-black font-bold text-xl">F</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center mb-1">
              Create your account
            </h1>
            <p className="text-gray-400 text-center text-sm">
              Join FinSync for smarter financial management
            </p>
          </div>
        </div>

        <div className="p-8 pt-4">
          {/* Google Sign In */}
          <div className="mb-6">
            <GoogleSignIn />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-gray-800"></div>
            <span className="bg-gray-900 text-gray-500 text-sm px-3 absolute">
              or continue with email
            </span>
          </div>

          {/* Sign Up Form */}
          <form className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-lg py-5 px-4 focus:border-lime-500 focus:ring-lime-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-lg py-5 px-4 focus:border-lime-500 focus:ring-lime-500/20"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                className="w-full cursor-pointer bg-lime-500 hover:bg-lime-600 text-black font-medium py-6 rounded-lg transition-all duration-200 shadow-lg shadow-lime-500/10"
                type="submit"
              >
                Create Account
              </Button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-lime-500 hover:text-lime-400 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-xs">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-gray-400 hover:text-lime-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-lime-500"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
