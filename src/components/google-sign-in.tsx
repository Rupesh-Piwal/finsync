import { auth, signIn } from "@/lib/auth";
import { SignOut } from "./sign-out";
import { Button } from "./ui/button";
import { Google } from "./ui/google";

export const GoogleSignIn = async () => {
  const session = await auth();
  console.log(session);
  const user = session?.user;

  return user ? (
    <>
      <h1 className="text-2xl">Welcome {user.name} </h1>
      <SignOut />
    </>
  ) : (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="w-full cursor-pointer" variant="outline">
        <Google />
        Continue with Google
      </Button>
    </form>
  );
};
