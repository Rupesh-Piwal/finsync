import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-between px-4 py-10 md:py-20 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
        {/* Optional decorative background overlay */}
        {/* You can replace the div below with an actual image if you like */}
        {/* <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[url('/lovable-uploads/your-image.png')] bg-no-repeat bg-right bg-contain" /> */}

        {/* Left content */}
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Smart Financial Management for Teams
          </h1>
          <p className="text-xl text-muted-foreground">
            Simplify your team's expense tracking and budget management with our
            comprehensive financial toolkit.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:justify-start justify-center">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 px-8"
            >
              <Link href="/login">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 rounded-full h-12 px-8"
              asChild
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card/40 w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Why Choose FinSync?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Tracking",
                description:
                  "Monitor expenses as they happen with instant updates and notifications.",
              },
              {
                title: "Team Collaboration",
                description:
                  "Work together seamlessly with role-based permissions and shared dashboards.",
              },
              {
                title: "Powerful Analytics",
                description:
                  "Gain insights with detailed reports and customizable data visualizations.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 px-4 border-t border-primary/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-semibold text-xl">FinSync</span>
          </div>

          <div className="flex space-x-6">
            <Link
              href="/login"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
