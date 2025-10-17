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
const isProduction =
  typeof window !== "undefined" &&
  window.location.hostname.includes("netlify.app");
const isLocalDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

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
      console.log(
        "🏗️ API Client initialized with token:",
        this.token ? "Token exists" : "No token"
      );
    }
  }

  // Get token from localStorage on every request
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token && token !== this.token) {
        this.token = token;
        console.log("🔄 Token refreshed from localStorage:", token ? "Token exists" : "No token");
      }
      return token;
    }
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    console.log("🌍 Making request to:", url);

    // Always get fresh token from localStorage
    const currentToken = this.getToken();
    
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
        ...options.headers,
      },
      ...options,
    };

    console.log("⚙️ Request config:", {
      method: config.method || "GET",
      headers: config.headers,
      body: config.body ? JSON.parse(config.body as string) : undefined,
    });

    console.log("🔐 Current token:", currentToken ? "Token exists" : "No token");
    console.log(
      "🔐 Authorization header:",
      (config.headers as any)?.Authorization ? "Present" : "Missing"
    );

    try {
      console.log("📡 Fetching...");
      const response = await fetch(url, config);
      console.log("📥 Response status:", response.status, response.statusText);

      const data = await response.json();
      console.log("📋 Response data:", data);

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
    console.log(
      "🔧 API Client setToken called with:",
      token ? "Token exists" : "No token"
    );
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("accessToken", token);
        console.log("💾 Token saved to localStorage");
      } else {
        localStorage.removeItem("accessToken");
        console.log("🗑️ Token removed from localStorage");
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
    console.log("🌐 API register called with:", {
      fullName,
      email,
      password: "***",
    });
    console.log("🔗 API Base URL:", this.baseURL);
    console.log("🏭 Is Production:", isProduction);

    const requestBody = { fullName, email, password };
    console.log("📦 Request body:", { ...requestBody, password: "***" });

    return this.request<RegisterResponse>("/users/register", {
      method: "POST",
      body: JSON.stringify(requestBody),
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
