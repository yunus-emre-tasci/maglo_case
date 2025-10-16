"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { formatCurrency, formatNumberWithDots } from "@/lib/utils";
import { FinancialSummarySkeleton } from "@/components/ui/Skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import { errorHandler } from "@/lib/errorHandler";

export function SummaryCards() {
  const {
    data: financialSummary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["financial-summary"],
    queryFn: () => apiClient.getFinancialSummary(),
    onError: (error) => {
      errorHandler.handleError(error, {
        component: "SummaryCards",
        action: "fetchFinancialSummary",
      });
    },
  });

  if (isLoading) {
    return <FinancialSummarySkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <TrendingDown className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading financial summary
            </h3>
            <p className="mt-1 text-sm text-red-700">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const summary = financialSummary?.data;

  if (!summary) {
    return null;
  }

  const summaryCards = [
    {
      title: "Total balance",
      amount: summary.totalBalance.amount,
      currency: summary.totalBalance.currency,
      change: summary.totalBalance.change,
      icon: "/TotalBalance.png",
      bgColor: "bg-gray-900",
      textColor: "text-white",
      iconColor: "text-white",
    },
    {
      title: "Total spending",
      amount: summary.totalExpense.amount,
      currency: summary.totalExpense.currency,
      change: summary.totalExpense.change,
      icon: "/TotalSpending.png",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
      iconColor: "text-gray-700",
    },
    {
      title: "Total saved",
      amount: summary.totalSavings.amount,
      currency: summary.totalSavings.currency,
      change: summary.totalSavings.change,
      icon: "/TotalSaved.png",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
      iconColor: "text-gray-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryCards.map((card, index) => {
        return (
          <div
            key={index}
            className={`${card.bgColor} rounded-2xl p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div
                className="p-2 rounded-full"
                style={{
                  backgroundColor:
                    card.title === "Total balance" ? "#4E5257" : "#EBE8E8",
                }}
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <div className="text-left">
                <p
                  className={`text-sm font-medium ${card.textColor} opacity-80 mb-1`}
                >
                  {card.title}
                </p>
                <p className={`text-xl font-bold ${card.textColor}`}>
                  ₺{formatNumberWithDots(card.amount)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
