import { ReactNode } from "react";
import { GridBackground } from "../grid-background";
import { Spotlight } from "../ui/spotlight";

export const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <Spotlight
        className="-top-20 left-0 md:-top-5 md:left-30"
        fill="#14B8A6" // Bright teal color that complements both teal and emerald
      />
      <GridBackground>{children}</GridBackground>
    </div>
  );
};
