import { CallToAction } from "@/components/cta/CallToAction";
import { FeatureCards } from "@/components/features/FeatureCards";
import { Features } from "@/components/features/Features";
import TransactionTableSection from "@/components/features/transaction-table-section";
import { Footer } from "@/components/footer/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { MarketingLayout } from "@/components/layout/MarketingLayout";

const Page = async () => {
  return (
    <MarketingLayout>
      <HeroSection />
      <Features />
      <TransactionTableSection/>
      <FeatureCards />
      <CallToAction />
      <Footer />
    </MarketingLayout>
  );
};

export default Page;
