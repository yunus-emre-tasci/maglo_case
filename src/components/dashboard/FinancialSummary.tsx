"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { formatCurrency, getTrendColor, getTrendIcon } from "@/lib/utils";
import { FinancialSummarySkeleton } from "@/components/ui/Skeleton";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PiggyBank,
} from "lucide-react";

export function FinancialSummary() {
  const {
    data: financialSummary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["financial-summary"],
    queryFn: () => apiClient.getFinancialSummary(),
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
      title: "Total Balance",
      amount: summary.totalBalance.amount,
      currency: summary.totalBalance.currency,
      change: summary.totalBalance.change,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Expense",
      amount: summary.totalExpense.amount,
      currency: summary.totalExpense.currency,
      change: summary.totalExpense.change,
      icon: CreditCard,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Total Savings",
      amount: summary.totalSavings.amount,
      currency: summary.totalSavings.currency,
      change: summary.totalSavings.change,
      icon: PiggyBank,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0 flex-1">
                <div
                  className={`p-2 sm:p-3 rounded-xl ${card.bgColor} flex-shrink-0`}
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${card.color}`} />
                </div>
                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                    {card.title}
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mt-1 truncate">
                    {formatCurrency(card.amount, card.currency)}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <div
                  className={`flex items-center text-xs sm:text-sm font-medium ${getTrendColor(
                    card.change.trend
                  )}`}
                >
                  <span className="mr-1">
                    {getTrendIcon(card.change.trend)}
                  </span>
                  <span>{Math.abs(card.change.percentage)}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                  vs last month
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
