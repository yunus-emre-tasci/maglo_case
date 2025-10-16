import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  );
}

export function FinancialSummarySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={`rounded-2xl p-6 shadow-sm ${
            i === 0 ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-white/20">
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 bg-gray-300 rounded"></div>
              <div className="h-4 w-8 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WorkingCapitalChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="h-64 bg-gray-100 rounded"></div>
    </div>
  );
}

export function WalletCardsSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 shadow-lg ${
              i === 0 ? "bg-gray-900" : "bg-gray-200"
            }`}
          >
            <div className="mb-4">
              <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-6 bg-gray-300 rounded"></div>
                <div className="w-8 h-6 bg-gray-300 rounded"></div>
              </div>
              {i === 0 && (
                <div className="text-right">
                  <div className="h-3 w-12 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentTransactionsSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScheduledTransfersSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 w-20 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
