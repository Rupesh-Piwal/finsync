import { ReactNode } from "react";
import { GridBackground } from "../grid-background";
import { Spotlight } from "../ui/spotlight";
import Header from "../header";

export const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <Spotlight
        className="-top-0 left-18 md:-top-5 md:left-10"
        fill="#B7B9BE"
      />
      <GridBackground>
        <>
          <Header />
          {children}
        </>
      </GridBackground>
    </div>
  );
};
