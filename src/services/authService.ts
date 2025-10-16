import * as ApiService from "./apiClient";
import { errorHandler } from "@/lib/errorHandler";

export async function login(email: string, password: string) {
  try {
    const response = await ApiService.login(email, password);

    if (response.success && response.data.token) {
      // Store token in localStorage
      localStorage.setItem("accessToken", response.data.token);
      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      };
    }

    throw new Error(response.message || "Login failed");
  } catch (error) {
    errorHandler.handleError(error, {
      component: "AuthService",
      action: "login",
    });
    throw error;
  }
}

export async function register(
  fullName: string,
  email: string,
  password: string
) {
  try {
    const response = await ApiService.register(fullName, email, password);

    if (response.success && response.data.token) {
      // Store token in localStorage
      localStorage.setItem("accessToken", response.data.token);
      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      };
    }

    throw new Error(response.message || "Registration failed");
  } catch (error) {
    errorHandler.handleError(error, {
      component: "AuthService",
      action: "register",
    });
    throw error;
  }
}

export async function logout() {
  try {
    await ApiService.logout();
    // Clear token from localStorage
    localStorage.removeItem("accessToken");
    return { success: true };
  } catch (error) {
    errorHandler.handleError(error, {
      component: "AuthService",
      action: "logout",
    });
    throw error;
  }
}

export async function getProfile() {
  try {
    const response = await ApiService.getProfile();
    return response.data;
  } catch (error) {
    errorHandler.handleError(error, {
      component: "AuthService",
      action: "getProfile",
    });
    throw error;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function clearAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
}
