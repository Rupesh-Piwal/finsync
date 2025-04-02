import { GoogleSignIn } from "@/components/google-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async() => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="w-full max-w-sm mx-auto space-y-6 mt-10">
      <form
        className="space-y-4"
        // action={async (formData) => {
        //   "use server";
        //   await executeAction({
        //     actionFn: async () => {
        //       await signIn("credentials", formData);
        //     },
        //   });
        // }}
      >
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
          autoComplete="current-password"
        />
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
        </Button>
      </div>
      <GoogleSignIn />
    </div>
  );
};

export default page;
