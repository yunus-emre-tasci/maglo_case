import * as ApiService from "./apiClient";
import { errorHandler } from "@/lib/errorHandler";

export async function getFinancialSummary() {
  try {
    const response = await ApiService.getFinancialSummary();
    return response.data;
  } catch (error) {
    errorHandler.handleError(error, {
      component: "FinancialService",
      action: "getFinancialSummary",
    });
    throw error;
  }
}

export async function getWorkingCapital() {
  try {
    const response = await ApiService.getWorkingCapital();
    return response.data;
  } catch (error) {
    errorHandler.handleError(error, {
      component: "FinancialService",
      action: "getWorkingCapital",
    });
    throw error;
  }
}

export async function getWallet() {
  try {
    const response = await ApiService.getWallet();
    return response.data;
  } catch (error) {
    errorHandler.handleError(error, {
      component: "FinancialService",
      action: "getWallet",
    });
    throw error;
  }
}

export async function getRecentTransactions() {
  try {
    const response = await ApiService.getRecentTransactions();
    return response.data;
  } catch (error) {
    errorHandler.handleError(error, {
      component: "FinancialService",
      action: "getRecentTransactions",
    });
    throw error;
  }
}

export async function getScheduledTransfers() {
  try {
    const response = await ApiService.getScheduledTransfers();
    return response.data;
  } catch (error) {
    errorHandler.handleError(error, {
      component: "FinancialService",
      action: "getScheduledTransfers",
    });
    throw error;
  }
}
