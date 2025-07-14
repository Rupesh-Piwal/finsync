import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import DashboardPage from "./page";
import { DashboardSkeleton } from "./skeletons/DashboardSkeleton";



const layout = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-24 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-title bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/80 bg-clip-text text-transparent">
          Dashboard
        </h1>
      </div>

      <Suspense
        fallback={
          <div className="w-full">
            <div className="w-full flex justify-center mb-8">
              <BarLoader className="mt-4" width={"100%"} color="#0D9488" />
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-400 text-sm">Loading your dashboard...</p>
            </div>

            <DashboardSkeleton />
          </div>
        }
      >
        <div className="w-full pb-8 sm:pb-12">
          <DashboardPage />
        </div>
      </Suspense>
    </div>
  );
};

export default layout;
