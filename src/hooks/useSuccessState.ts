"use client";

import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";

interface SuccessState {
  isSuccess: boolean;
  message: string;
  autoHide: boolean;
  duration: number;
}

interface UseSuccessStateOptions {
  autoHide?: boolean;
  duration?: number;
  onSuccess?: (message: string) => void;
}

export function useSuccessState(options: UseSuccessStateOptions = {}) {
  const { autoHide = true, duration = 3000, onSuccess } = options;

  const [state, setState] = useState<SuccessState>({
    isSuccess: false,
    message: "",
    autoHide,
    duration,
  });

  const showSuccess = useCallback(
    (message: string, customDuration?: number) => {
      setState((prev) => ({
        ...prev,
        isSuccess: true,
        message,
        duration: customDuration || prev.duration,
      }));

      // Show toast notification
      toast.success(message, {
        duration: customDuration || duration,
      });

      if (onSuccess) {
        onSuccess(message);
      }
    },
    [duration, onSuccess]
  );

  const hideSuccess = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSuccess: false,
      message: "",
    }));
  }, []);

  // Auto-hide success message
  useEffect(() => {
    if (state.isSuccess && state.autoHide) {
      const timer = setTimeout(() => {
        hideSuccess();
      }, state.duration);

      return () => clearTimeout(timer);
    }
  }, [state.isSuccess, state.autoHide, state.duration, hideSuccess]);

  return {
    isSuccess: state.isSuccess,
    message: state.message,
    showSuccess,
    hideSuccess,
  };
}

// Predefined success messages for common actions
export const SUCCESS_MESSAGES = {
  LOGIN: "Welcome back! Redirecting to dashboard...",
  REGISTER: "Account created successfully! Redirecting to dashboard...",
  LOGOUT: "Logged out successfully",
  PROFILE_UPDATE: "Profile updated successfully",
  PASSWORD_CHANGE: "Password changed successfully",
  DATA_SAVED: "Data saved successfully",
  DATA_DELETED: "Data deleted successfully",
  DATA_UPDATED: "Data updated successfully",
} as const;

// Success state hook with predefined messages
export function usePredefinedSuccess() {
  const successState = useSuccessState();

  const showLoginSuccess = useCallback(() => {
    successState.showSuccess(SUCCESS_MESSAGES.LOGIN, 2000);
  }, [successState]);

  const showRegisterSuccess = useCallback(() => {
    successState.showSuccess(SUCCESS_MESSAGES.REGISTER, 2000);
  }, [successState]);

  const showLogoutSuccess = useCallback(() => {
    successState.showSuccess(SUCCESS_MESSAGES.LOGOUT, 1500);
  }, [successState]);

  const showProfileUpdateSuccess = useCallback(() => {
    successState.showSuccess(SUCCESS_MESSAGES.PROFILE_UPDATE, 2000);
  }, [successState]);

  const showPasswordChangeSuccess = useCallback(() => {
    successState.showSuccess(SUCCESS_MESSAGES.PASSWORD_CHANGE, 2000);
  }, [successState]);

  const showDataSavedSuccess = useCallback(() => {
    successState.showSuccess(SUCCESS_MESSAGES.DATA_SAVED, 1500);
  }, [successState]);

  const showDataDeletedSuccess = useCallback(() => {
    successState.showSuccess(SUCCESS_MESSAGES.DATA_DELETED, 1500);
  }, [successState]);

  const showDataUpdatedSuccess = useCallback(() => {
    successState.showSuccess(SUCCESS_MESSAGES.DATA_UPDATED, 1500);
  }, [successState]);

  return {
    ...successState,
    showLoginSuccess,
    showRegisterSuccess,
    showLogoutSuccess,
    showProfileUpdateSuccess,
    showPasswordChangeSuccess,
    showDataSavedSuccess,
    showDataDeletedSuccess,
    showDataUpdatedSuccess,
  };
}
