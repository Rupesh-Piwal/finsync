import { Skeleton } from "@/components/ui/skeleton";

export const AccountChartSkeleton = () => {
  return (
    <div className="bg-[#111111] border border-gray-800 shadow-2xl rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 pb-5">
        <div className="flex items-center">
          <Skeleton className="h-9 w-9 rounded-lg mr-3 bg-gradient-to-br from-gray-700 to-gray-900" />
          <Skeleton className="h-6 w-48 bg-gradient-to-br from-gray-700 to-gray-900" />
        </div>
        <Skeleton className="h-10 w-full sm:w-[160px] bg-gradient-to-br from-gray-700 to-gray-900" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-gray-900/20 to-gray-800/40 p-5 rounded-xl border border-gray-800"
          >
            <div className="flex flex-col items-center">
              <Skeleton className="h-9 w-9 rounded-full mb-2 bg-gradient-to-br from-gray-700 to-gray-900" />
              <Skeleton className="h-4 w-20 mb-1 bg-gradient-to-br from-gray-700 to-gray-900" />
              <Skeleton className="h-8 w-24 bg-gradient-to-br from-gray-700 to-gray-900" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/40 p-6 rounded-xl border border-gray-800 h-[310px]">
        <Skeleton className="h-full w-full bg-gradient-to-br from-gray-700 to-gray-900" />
      </div>
    </div>
  );
};