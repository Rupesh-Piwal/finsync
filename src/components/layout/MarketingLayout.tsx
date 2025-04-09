import { ReactNode } from "react";
import { GridBackground } from "../grid-background";

export const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <GridBackground>{children}</GridBackground>
    </div>
  );
};
