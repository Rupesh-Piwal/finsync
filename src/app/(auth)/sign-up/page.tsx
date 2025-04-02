import { GoogleSignIn } from "@/components/google-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="w-full max-w-sm mx-auto space-y-6 mt-10">
      <form
        className="space-y-4"
        // action={async (formData) => {
        //   "use server";
        //   const res = await signUp(formData);
        //   if (res.success) {
        //     redirect("/sign-in");
        //   }
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
          autoComplete="new-password"
        />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/sign-in">Already have an account? Sign in</Link>
        </Button>
      </div>
      <GoogleSignIn />
    </div>
  );
};

export default page;
