import { Skeleton } from "@/components/ui/skeleton";

export const TransactionTableSkeleton = () => {
  return (
    <div className="backdrop-blur-md shadow-inner shadow-black/20 text-gray-100 rounded-2xl md:p-2">
      <div className="flex flex-col gap-4 p-4 sm:p-6 mb-3 bg-gradient-to-br from-[#1b1b1b] to-[#1c1c1c] rounded-xl border border-gray-800">
        <div className="relative w-full">
          <Skeleton className="h-10 w-full bg-gradient-to-br from-gray-700 to-gray-900" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-full sm:w-[140px] bg-gradient-to-br from-gray-700 to-gray-900" />
          <Skeleton className="h-10 w-full sm:w-[160px] bg-gradient-to-br from-gray-700 to-gray-900" />
        </div>
      </div>

      <div className="border border-gray-800 rounded overflow-hidden">
        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#121212] p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-4 bg-gradient-to-br from-gray-700 to-gray-900" />
            <Skeleton className="h-4 w-16 bg-gradient-to-br from-gray-700 to-gray-900" />
            <Skeleton className="h-4 w-24 bg-gradient-to-br from-gray-700 to-gray-900" />
            <Skeleton className="h-4 w-20 bg-gradient-to-br from-gray-700 to-gray-900" />
            <Skeleton className="h-4 w-16 bg-gradient-to-br from-gray-700 to-gray-900" />
            <Skeleton className="h-4 w-20 bg-gradient-to-br from-gray-700 to-gray-900" />
            <Skeleton className="h-4 w-4 bg-gradient-to-br from-gray-700 to-gray-900" />
          </div>
        </div>

        {[...Array(5)].map((_, i) => (
          <div key={i} className="border-b border-gray-800 p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-4 bg-gradient-to-br from-gray-700 to-gray-900" />
              <Skeleton className="h-4 w-20 bg-gradient-to-br from-gray-700 to-gray-900" />
              <Skeleton className="h-4 w-32 bg-gradient-to-br from-gray-700 to-gray-900" />
              <Skeleton className="h-6 w-20 bg-gradient-to-br from-gray-700 to-gray-900" />
              <Skeleton className="h-4 w-16 bg-gradient-to-br from-gray-700 to-gray-900" />
              <Skeleton className="h-6 w-24 bg-gradient-to-br from-gray-700 to-gray-900" />
              <Skeleton className="h-4 w-4 bg-gradient-to-br from-gray-700 to-gray-900 " />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <Skeleton className="h-8 w-8 bg-gradient-to-br from-gray-700 to-gray-900" />
        <Skeleton className="h-8 w-24 bg-gradient-to-br from-gray-700 to-gray-900" />
        <Skeleton className="h-8 w-8 bg-gradient-to-br from-gray-700 to-gray-900" />
      </div>
    </div>
  );
};
