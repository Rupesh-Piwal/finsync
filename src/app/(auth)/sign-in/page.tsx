import { auth, signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { executeAction } from "@/lib/executeAction";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/google-sign-in";

const SignInPage = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
        <div className="relative">
          {/* Abstract design elements */}
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
              Welcome back
            </h1>
            <p className="text-gray-400 text-center text-sm">
              Sign in to access your FinSync account
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

          {/* Sign In Form */}
          <form
            className="space-y-5"
            action={async (formData) => {
              "use server";
              await executeAction({
                actionFn: async () => {
                  await signIn("credentials", formData);
                },
              });
            }}
          >
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
                  autoComplete="current-password"
                  className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-lg py-5 px-4 focus:border-lime-500 focus:ring-lime-500/20"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                className="w-full cursor-pointer bg-lime-500 hover:bg-lime-600 text-black font-medium py-6 rounded-lg transition-all duration-200 shadow-lg shadow-lime-500/10"
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-lime-500 hover:text-lime-400 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span className="text-gray-500 text-xs ml-2">
              Secure, encrypted connection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
