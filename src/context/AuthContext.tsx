"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api";
import { AuthContextType, User, RegisterForm } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      const response = await apiClient.login(email, password);

      apiClient.setToken(response.data.accessToken);
      setUser(response.data.user);

      // Show spinner for 500ms before showing success message and redirect
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Login successful!");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      const response = await apiClient.register(
        data.fullName,
        data.email,
        data.password
      );

      // Show spinner for 500ms before showing success message and redirect
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Registration successful! Please log in.");

      router.push("/signin");
    } catch (error: any) {
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
