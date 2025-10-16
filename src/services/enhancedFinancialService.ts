import { useApiState } from "@/hooks/useApiState";
import * as ApiService from "./apiClient";

// Enhanced Financial Service with state management
export function useEnhancedFinancial() {
  const financialSummaryState = useApiState({
    showGlobalLoading: false,
    onError: (error) => {
      console.error("Financial summary fetch failed:", error);
    },
  });

  const workingCapitalState = useApiState({
    showGlobalLoading: false,
    onError: (error) => {
      console.error("Working capital fetch failed:", error);
    },
  });

  const walletState = useApiState({
    showGlobalLoading: false,
    onError: (error) => {
      console.error("Wallet fetch failed:", error);
    },
  });

  const recentTransactionsState = useApiState({
    showGlobalLoading: false,
    onError: (error) => {
      console.error("Recent transactions fetch failed:", error);
    },
  });

  const scheduledTransfersState = useApiState({
    showGlobalLoading: false,
    onError: (error) => {
      console.error("Scheduled transfers fetch failed:", error);
    },
  });

  const getFinancialSummary = async () => {
    return financialSummaryState.execute(
      () => ApiService.getFinancialSummary(),
      { component: "EnhancedFinancialService", action: "getFinancialSummary" }
    );
  };

  const getWorkingCapital = async () => {
    return workingCapitalState.execute(() => ApiService.getWorkingCapital(), {
      component: "EnhancedFinancialService",
      action: "getWorkingCapital",
    });
  };

  const getWallet = async () => {
    return walletState.execute(() => ApiService.getWallet(), {
      component: "EnhancedFinancialService",
      action: "getWallet",
    });
  };

  const getRecentTransactions = async () => {
    return recentTransactionsState.execute(
      () => ApiService.getRecentTransactions(),
      { component: "EnhancedFinancialService", action: "getRecentTransactions" }
    );
  };

  const getScheduledTransfers = async () => {
    return scheduledTransfersState.execute(
      () => ApiService.getScheduledTransfers(),
      { component: "EnhancedFinancialService", action: "getScheduledTransfers" }
    );
  };

  return {
    // Financial Summary
    getFinancialSummary,
    financialSummaryState: {
      isLoading: financialSummaryState.isLoading,
      error: financialSummaryState.error,
      isSuccess: financialSummaryState.isSuccess,
    },

    // Working Capital
    getWorkingCapital,
    workingCapitalState: {
      isLoading: workingCapitalState.isLoading,
      error: workingCapitalState.error,
      isSuccess: workingCapitalState.isSuccess,
    },

    // Wallet
    getWallet,
    walletState: {
      isLoading: walletState.isLoading,
      error: walletState.error,
      isSuccess: walletState.isSuccess,
    },

    // Recent Transactions
    getRecentTransactions,
    recentTransactionsState: {
      isLoading: recentTransactionsState.isLoading,
      error: recentTransactionsState.error,
      isSuccess: recentTransactionsState.isSuccess,
    },

    // Scheduled Transfers
    getScheduledTransfers,
    scheduledTransfersState: {
      isLoading: scheduledTransfersState.isLoading,
      error: scheduledTransfersState.error,
      isSuccess: scheduledTransfersState.isSuccess,
    },
  };
}
