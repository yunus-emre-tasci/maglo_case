import {
  ApiResponse,
  LoginResponse,
  RegisterResponse,
  FinancialSummary,
  WorkingCapital,
  Wallet,
  RecentTransactions,
  ScheduledTransfers,
  User,
} from "@/types";
import { errorHandler, AppError } from "./errorHandler";

// Check if we're in production (Netlify) or development
const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('netlify.app');
const isLocalDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 
  (isProduction ? "/api" : isLocalDev ? "http://localhost:5737/api" : "/api");

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("accessToken");
    }
  }


  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {

    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const apiError = errorHandler.createApiError(
          data.message || "An error occurred",
          response.status,
          data.code,
          data
        );

        // Handle error with context
        errorHandler.handleError(apiError, {
          component: "ApiClient",
          action: "request",
          url: endpoint,
        });

        throw apiError;
      }

      return data;
    } catch (error) {
      // Handle network and other errors
      if (error instanceof AppError) {
        throw error; // Re-throw AppError as-is
      }

      // Handle network errors and other exceptions
      const networkError = new AppError(
        error instanceof Error ? error.message : "Network error occurred",
        0,
        "NETWORK_ERROR"
      );

      errorHandler.handleError(networkError, {
        component: "ApiClient",
        action: "request",
        url: endpoint,
      });

      throw networkError;
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("accessToken", token);
      } else {
        localStorage.removeItem("accessToken");
      }
    }
  }

  // Auth endpoints
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(
    fullName: string,
    email: string,
    password: string
  ): Promise<ApiResponse<RegisterResponse>> {
    return this.request<RegisterResponse>("/users/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    });
  }

  async logout(): Promise<void> {
    await this.request("/users/logout", { method: "POST" });
    this.setToken(null);
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>("/users/profile");
  }

  // Financial endpoints
  async getFinancialSummary(): Promise<ApiResponse<FinancialSummary>> {
    return this.request<FinancialSummary>("/financial/summary");
  }

  async getWorkingCapital(): Promise<ApiResponse<WorkingCapital>> {
    return this.request<WorkingCapital>("/financial/working-capital");
  }

  async getWallet(): Promise<ApiResponse<Wallet>> {
    return this.request<Wallet>("/financial/wallet");
  }

  async getRecentTransactions(): Promise<ApiResponse<RecentTransactions>> {
    return this.request<RecentTransactions>("/financial/transactions/recent");
  }

  async getScheduledTransfers(): Promise<ApiResponse<ScheduledTransfers>> {
    return this.request<ScheduledTransfers>("/financial/transfers/scheduled");
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
