import { auth, signIn } from "@/lib/auth";
import { SignOut } from "./sign-out";

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
      <button type="submit">Signin with Google</button>
    </form>
  );
};
