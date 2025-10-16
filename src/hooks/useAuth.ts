"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { apiClient } from "@/lib/api";
import { errorHandler } from "@/lib/errorHandler";
import toast from "react-hot-toast";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { user, isLoading } = context;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const login = async (data: LoginData) => {
    setIsSubmitting(true);
    try {
      const response: any = await apiClient.login(data.email, data.password);
      
      if (response.success && response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
        toast.success("Welcome back! Redirecting to dashboard...");
        
        // Redirect after a short delay to show the toast
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: "useAuth",
        action: "login",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsSubmitting(true);
    try {
      const response: any = await apiClient.register(data.fullName, data.email, data.password);

      if (response.success && response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
        toast.success("Account created successfully! Redirecting to dashboard...");
        
        // Redirect after a short delay to show the toast
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: "useAuth",
        action: "register",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    toast.success("Logged out successfully!");
    router.push("/signin");
  };

  return {
    user,
    isLoading,
    isSubmitting,
    login,
    register,
    logout,
  };
}