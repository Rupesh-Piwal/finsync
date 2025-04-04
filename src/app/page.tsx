import { CallToAction } from "@/components/cta/CallToAction";
import { AITechnology } from "@/components/features/AITechnology";
import { FeatureCards } from "@/components/features/FeatureCards";
import { HowItWorks } from "@/components/features/HowItWorks";
import { Footer } from "@/components/footer/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


const Page = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <MarketingLayout>
      <HeroSection />
      <HowItWorks />
      <FeatureCards />
      <AITechnology />
      <CallToAction />
      <Footer />
    </MarketingLayout>
  );
};

export default Page;
