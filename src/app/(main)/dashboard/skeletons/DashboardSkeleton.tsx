import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6">
        <Skeleton className="h-6 w-1/3 mb-4 bg-gradient-to-br from-gray-700 to-gray-900 " />
        <Skeleton className="h-4 w-full mb-2 bg-gradient-to-br from-gray-700 to-gray-900" />
        <Skeleton className="h-2 w-full mb-4 bg-gradient-to-br from-gray-700 to-gray-900" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20 bg-gradient-to-br from-gray-700 to-gray-900" />
          <Skeleton className="h-4 w-20 bg-gradient-to-br from-gray-700 to-gray-900" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6">
        <Skeleton className="h-6 w-1/4 mb-6 bg-gradient-to-br from-gray-700 to-gray-900" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Skeleton className="h-20 bg-gradient-to-br from-gray-700 to-gray-900" />
          <Skeleton className="h-20 bg-gradient-to-br from-gray-700 to-gray-900" />
          <Skeleton className="h-20 bg-gradient-to-br from-gray-700 to-gray-900" />
        </div>
        <Skeleton className="h-64 bg-gradient-to-br from-gray-700 to-gray-900" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 h-32">
          <div className="flex flex-col items-center justify-center h-full">
            <Skeleton className="w-12 h-12 rounded-full mb-4 bg-gradient-to-br from-gray-700 to-gray-900" />
            <Skeleton className="h-4 w-24 bg-gradient-to-br from-gray-700 to-gray-900" />
          </div>
        </div>

        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 h-32"
          >
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="h-5 w-20 bg-gradient-to-br from-gray-700 to-gray-900" />
              <Skeleton className="h-4 w-16 bg-gradient-to-br from-gray-700 to-gray-900" />
            </div>
            <Skeleton className="h-6 w-24 mb-2 bg-gradient-to-br from-gray-700 to-gray-900" />
            <Skeleton className="h-4 w-16 bg-gradient-to-br from-gray-700 to-gray-900" />
          </div>
        ))}
      </div>
    </div>
  );
};
