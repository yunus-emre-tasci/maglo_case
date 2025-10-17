"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api";
import { AuthContextType, User, RegisterForm } from "@/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          apiClient.setToken(token);
          const response = await apiClient.getProfile();
          setUser(response.data);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem("accessToken");
        apiClient.setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response: any = await apiClient.login(email, password);

      console.log("🔑 Login response:", response);
      console.log("🔍 Response structure:", {
        success: response.success,
        message: response.message,
        data: response.data,
        dataKeys: response.data ? Object.keys(response.data) : "No data"
      });
      // Try different token field names
      const token = response.data.token || response.data.accessToken || response.data.authToken || response.data.jwt;
      console.log("🎫 Token received:", token);
      console.log("🔍 Available fields:", Object.keys(response.data));

      if (!token) {
        console.error("❌ No token found in response!");
        throw new Error("No authentication token received");
      }

      // Set token in both localStorage and apiClient
      localStorage.setItem("accessToken", token);
      apiClient.setToken(token);
      setUser(response.data.user);

      console.log("✅ Token set successfully");

      // Show spinner for 500ms before showing success message and redirect
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Login successful!");

      router.push("/dashboard");
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterForm) => {
    console.log("🔐 AuthContext register called with:", data);
    try {
      setIsLoading(true);
      console.log("📡 Calling API register...");
      const response: any = await apiClient.register(
        data.fullName,
        data.email,
        data.password
      );
      console.log("📥 API response:", response);
      console.log("🔍 Register response structure:", {
        success: response.success,
        message: response.message,
        data: response.data,
        dataKeys: response.data ? Object.keys(response.data) : "No data"
      });

      // Try different token field names
      const token = response.data.token || response.data.accessToken || response.data.authToken || response.data.jwt;
      console.log("🎫 Register token received:", token);
      console.log("🔍 Available fields:", Object.keys(response.data));

      if (!token) {
        console.error("❌ No token found in register response!");
        throw new Error("No authentication token received");
      }

      // Set token in both localStorage and apiClient
      localStorage.setItem("accessToken", token);
      apiClient.setToken(token);
      setUser(response.data.user);

      console.log("✅ Token set successfully");

      // Show spinner for 500ms before showing success message and redirect
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Registration successful! Redirecting to dashboard...");
      console.log("✅ Registration completed successfully");

      router.push("/dashboard");
    } catch (error: any) {
      console.error("💥 Registration error:", error);
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      apiClient.setToken(null);
      router.push("/signin");
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
