"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { WorkingCapitalChart } from "@/components/dashboard/WorkingCapitalChart";
import { WalletCards } from "@/components/dashboard/WalletCards";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import {
  ErrorBoundary,
  DashboardErrorFallback,
  ChartErrorFallback,
} from "@/components/ui/ErrorBoundary";

export default function DashboardPage() {
  const [showShimmer, setShowShimmer] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem("accessToken");
    console.log(
      "🔍 Dashboard token check:",
      token ? "Token exists" : "No token"
    );

    if (!token) {
      console.error("❌ No token found, redirecting to signin");
      router.push("/signin");
      return;
    }

    // Set authenticated state
    setIsAuthenticated(true);

    const timer = setTimeout(() => {
      setShowShimmer(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  if (showShimmer) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content Shimmer */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary Cards Shimmer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Working Capital Chart Shimmer */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
            </div>
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Recent Transactions Shimmer */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-40"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>

            {/* Table Headers Shimmer */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
            </div>

            {/* Table Rows Shimmer */}
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-4 items-center py-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Wallet Shimmer */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Credit Cards Shimmer */}
            <div className="mb-6">
              <div className="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>

            {/* Scheduled Transfers Shimmer */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={DashboardErrorFallback}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary Cards - Top */}
          <ErrorBoundary fallback={ChartErrorFallback}>
            <SummaryCards />
          </ErrorBoundary>

          {/* Working Capital Chart - Middle */}
          <ErrorBoundary fallback={ChartErrorFallback}>
            <WorkingCapitalChart />
          </ErrorBoundary>

          {/* Recent Transactions - Bottom */}
          <ErrorBoundary fallback={ChartErrorFallback}>
            <RecentTransactions />
          </ErrorBoundary>
        </div>

        {/* Right Column - Wallet Only */}
        <div className="lg:col-span-1">
          <ErrorBoundary fallback={ChartErrorFallback}>
            <WalletCards />
          </ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  );
}
