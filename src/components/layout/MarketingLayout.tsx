import { ReactNode } from "react";

export const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {children}
    </div>
  );
};
