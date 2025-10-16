import { apiClient } from "@/lib/api";
import { errorHandler } from "@/lib/errorHandler";

// Auth services
export async function login(email: string, password: string) {
  try {
    return await apiClient.login(email, password);
  } catch (error) {
    errorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        component: "ApiService",
        action: "login",
      }
    );
    throw error;
  }
}

export async function register(
  fullName: string,
  email: string,
  password: string
) {
  try {
    return await apiClient.register(fullName, email, password);
  } catch (error) {
    errorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        component: "ApiService",
        action: "register",
      }
    );
    throw error;
  }
}

export async function logout() {
  try {
    return await apiClient.logout();
  } catch (error) {
    errorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        component: "ApiService",
        action: "logout",
      }
    );
    throw error;
  }
}

export async function getProfile() {
  try {
    return await apiClient.getProfile();
  } catch (error) {
    errorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        component: "ApiService",
        action: "getProfile",
      }
    );
    throw error;
  }
}

// Financial services
export async function getFinancialSummary() {
  try {
    return await apiClient.getFinancialSummary();
  } catch (error) {
    errorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        component: "ApiService",
        action: "getFinancialSummary",
      }
    );
    throw error;
  }
}

export async function getWorkingCapital() {
  try {
    return await apiClient.getWorkingCapital();
  } catch (error) {
    errorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        component: "ApiService",
        action: "getWorkingCapital",
      }
    );
    throw error;
  }
}

export async function getWallet() {
  try {
    return await apiClient.getWallet();
  } catch (error) {
    errorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        component: "ApiService",
        action: "getWallet",
      }
    );
    throw error;
  }
}

export async function getRecentTransactions() {
  try {
    return await apiClient.getRecentTransactions();
  } catch (error) {
    errorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        component: "ApiService",
        action: "getRecentTransactions",
      }
    );
    throw error;
  }
}

export async function getScheduledTransfers() {
  try {
    return await apiClient.getScheduledTransfers();
  } catch (error) {
    errorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        component: "ApiService",
        action: "getScheduledTransfers",
      }
    );
    throw error;
  }
}
