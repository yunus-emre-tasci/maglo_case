"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
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

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

export function useAuth() {
  const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          setIsLoading(true);
          const response = await apiClient.getProfile();
          setUser(response.data);
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("accessToken");
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setIsLoading]);

  const login = async (data: LoginData) => {
    try {
      setIsSubmitting(true);
      const response = await apiClient.login(data.email, data.password);

      if (response.success && response.data.token) {
        apiClient.setToken(response.data.token);
        setUser(response.data.user);

        // Show success toast with delay
        setTimeout(() => {
          toast.success("Welcome back! Redirecting to dashboard...");
        }, 500);

        return { success: true };
      }

      throw new Error(response.message || "Login failed");
    } catch (error) {
      errorHandler.handleError(error, {
        component: "useAuth",
        action: "login",
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsSubmitting(true);
      const response = await apiClient.register(
        data.fullName,
        data.email,
        data.password
      );

      if (response.success && response.data.token) {
        apiClient.setToken(response.data.token);
        setUser(response.data.user);

        // Show success toast with delay
        setTimeout(() => {
          toast.success(
            "Account created successfully! Redirecting to dashboard..."
          );
        }, 500);

        return { success: true };
      }

      throw new Error(response.message || "Registration failed");
    } catch (error) {
      errorHandler.handleError(error, {
        component: "useAuth",
        action: "register",
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
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
      toast.success("Logged out successfully");
    }
  };

  const isAuthenticated = !!user;
  const isGuest = !user && !isLoading;

  return {
    user,
    isAuthenticated,
    isGuest,
    isLoading,
    isSubmitting,
    login,
    register,
    logout,
  };
}
