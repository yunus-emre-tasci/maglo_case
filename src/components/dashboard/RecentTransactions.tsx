"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { formatCurrency, formatTransactionDate } from "@/lib/utils";
import { RecentTransactionsSkeleton } from "@/components/ui/Skeleton";
import { ExternalLink, AlertCircle, ChevronRight } from "lucide-react";
import Image from "next/image";

export function RecentTransactions() {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recent-transactions"],
    queryFn: () => apiClient.getRecentTransactions(),
  });

  if (isLoading) {
    return <RecentTransactionsSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading transactions
            </h3>
            <p className="mt-1 text-sm text-red-700">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const data = transactions?.data;

  if (!data || !data.transactions || data.transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Transactions
          </h3>
          <p className="text-gray-600">
            You don't have any recent transactions.
          </p>
        </div>
      </div>
    );
  }

  const getBusinessIcon = (business: string, index: number) => {
    const iconMap = {
      0: "/Iphone.png",
      1: "/Netflix.png",
      2: "/Figma.png",
    };

    return (
      <Image
        src={iconMap[index as keyof typeof iconMap] || "/default.png"}
        alt={business}
        width={24}
        height={24}
        className="object-contain"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Transaction
        </h3>
        <button
          className="flex items-center space-x-1 text-sm font-semibold hover:text-gray-900 cursor-pointer"
          style={{ color: "#29A073" }}
        >
          <span>View All</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="text-xs font-semibold" style={{ color: "#929EAE" }}>
          NAME/BUSINESS
        </div>
        <div
          className="text-xs font-semibold flex items-center justify-center"
          style={{ color: "#929EAE" }}
        >
          TYPE
        </div>
        <div
          className="text-xs font-semibold flex items-center justify-center"
          style={{ color: "#929EAE" }}
        >
          AMOUNT
        </div>
        <div
          className="text-xs font-semibold flex items-center justify-center"
          style={{ color: "#929EAE" }}
        >
          DATE
        </div>
      </div>

      {/* Table Data */}
      <div className="space-y-3">
        {data.transactions
          .slice(0, 3)
          .map((transaction: any, index: number) => (
            <div
              key={index}
              className="relative grid grid-cols-4 gap-4 items-center py-3"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={`/${
                    index === 0
                      ? "Iphone"
                      : index === 1
                      ? "Netflix"
                      : index === 2
                      ? "Figma"
                      : "default"
                  }.png`}
                  alt={transaction.business}
                  width={32}
                  height={32}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#1B212D" }}
                >
                  {index === 0
                    ? "iPhone 13 Pro MAX"
                    : index === 1
                    ? "Netflix Subscription"
                    : index === 2
                    ? "Figma Subscription"
                    : transaction.name}
                </span>
              </div>
              <div
                className="text-sm font-medium flex items-center justify-center"
                style={{ color: "#929EAE" }}
              >
                {index === 0
                  ? "Mobile"
                  : index === 1
                  ? "Entertainment"
                  : index === 2
                  ? "Software"
                  : "Other"}
              </div>
              <div className="text-sm font-semibold text-gray-900 flex items-center justify-center">
                {formatCurrency(
                  Math.abs(transaction.amount),
                  transaction.currency
                )}
              </div>
              <div
                className="text-sm font-medium flex items-center justify-center"
                style={{ color: "#929EAE" }}
              >
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              {/* Ayırıcı çizgi - son satır hariç */}
              {index < data.transactions.slice(0, 3).length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
