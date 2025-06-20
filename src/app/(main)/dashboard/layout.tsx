import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import DashboardPage from "./page";

const layout = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-24 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
        <h1 className=" mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-title">
          Dashboard
        </h1>
      </div>
      <Suspense
        fallback={
          <div className="w-full flex justify-center">
            <BarLoader className="mt-4" width={"100%"} color="#0D9488" />{" "}
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
