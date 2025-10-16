"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { errorHandler } from "@/lib/errorHandler";

export function useFinancialSummary() {
  return useQuery({
    queryKey: ["financial-summary"],
    queryFn: () => apiClient.getFinancialSummary(),
    onError: (error) => {
      errorHandler.handleError(error, {
        component: "useFinancialSummary",
        action: "fetchFinancialSummary",
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}

export function useWorkingCapital() {
  return useQuery({
    queryKey: ["working-capital"],
    queryFn: () => apiClient.getWorkingCapital(),
    onError: (error) => {
      errorHandler.handleError(error, {
        component: "useWorkingCapital",
        action: "fetchWorkingCapital",
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}

export function useWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: () => apiClient.getWallet(),
    onError: (error) => {
      errorHandler.handleError(error, {
        component: "useWallet",
        action: "fetchWallet",
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}

export function useRecentTransactions() {
  return useQuery({
    queryKey: ["recent-transactions"],
    queryFn: () => apiClient.getRecentTransactions(),
    onError: (error) => {
      errorHandler.handleError(error, {
        component: "useRecentTransactions",
        action: "fetchRecentTransactions",
      });
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
  });
}

export function useScheduledTransfers() {
  return useQuery({
    queryKey: ["scheduled-transfers"],
    queryFn: () => apiClient.getScheduledTransfers(),
    onError: (error) => {
      errorHandler.handleError(error, {
        component: "useScheduledTransfers",
        action: "fetchScheduledTransfers",
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}
