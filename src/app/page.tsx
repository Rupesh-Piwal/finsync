import { CallToAction } from "@/components/cta/CallToAction";
import { AITechnology } from "@/components/features/AITechnology";
import { FeatureCards } from "@/components/features/FeatureCards";
import { HowItWorks } from "@/components/features/HowItWorks";
import { Footer } from "@/components/footer/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { redirect } from "next/navigation";


const Page = async () => {

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
