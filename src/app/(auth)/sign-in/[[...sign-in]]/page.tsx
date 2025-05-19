import { Logo } from "@/components/ui/logo";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden px-4 py-6 sm:py-10">
      <div className="absolute -top-40 -left-40 w-80 h-80 sm:w-96 sm:h-96 bg-emerald-500 opacity-20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 sm:w-96 sm:h-96 bg-teal-500 opacity-20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/90 backdrop-blur-sm shadow-2xl">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl" />
        <div>
          <div className="text-center pt-5 flex flex-col items-center">
            <Logo />
          </div>

          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90",
                footerActionLink: "text-emerald-400",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                formFieldInput: "bg-gray-800 border-gray-700",
                dividerLine: "bg-gray-700",
                dividerText: "text-gray-500",
                identityPreviewEditButton: "text-emerald-400",
                card: "bg-transparent shadow-none",
                rootBox: "w-full",
              },
              layout: {
                socialButtonsVariant: "iconButton",
                socialButtonsPlacement: "top",
              },
              variables: {
                colorPrimary: "#10b981",
                colorText: "white",
                colorTextSecondary: "#94a3b8",
                colorBackground: "transparent",
                colorInputBackground: "#1f2937",
                colorDanger: "#ef4444",
                borderRadius: "0.5rem",
                fontFamily: "inherit",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
