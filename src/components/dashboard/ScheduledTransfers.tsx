"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ScheduledTransfersSkeleton } from "@/components/ui/Skeleton";
import { ExternalLink, AlertCircle } from "lucide-react";

export function ScheduledTransfers() {
  const {
    data: transfers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["scheduled-transfers"],
    queryFn: () => apiClient.getScheduledTransfers(),
  });

  if (isLoading) {
    return <ScheduledTransfersSkeleton />;
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
              Error loading scheduled transfers
            </h3>
            <p className="mt-1 text-sm text-red-700">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const data = transfers?.data;

  if (!data || !data.transfers || data.transfers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Scheduled Transfers
          </h3>
          <p className="text-gray-600">
            You don&apos;t have any scheduled transfers.
          </p>
        </div>
      </div>
    );
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Scheduled Transfers
        </h3>
        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center">
          View All
          <ExternalLink className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-0">
        {data.transfers.map((transfer, index) => (
          <div
            key={transfer.id}
            className="relative flex items-center justify-between py-3 bg-white hover:bg-white"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 ${getAvatarColor(
                  transfer.name
                )} rounded-full flex items-center justify-center`}
              >
                <span className="text-white text-sm font-semibold">
                  {getInitials(transfer.name)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {transfer.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(transfer.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                - {formatCurrency(transfer.amount, transfer.currency)}
              </p>
            </div>

            {/* Ayırıcı çizgi - son satır hariç */}
            {index < data.transfers.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
