"use client";

import { useState, useCallback } from "react";
import { useGlobalLoading } from "@/context/GlobalLoadingContext";
import { errorHandler } from "@/lib/errorHandler";

interface ApiState {
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

interface UseApiStateOptions {
  showGlobalLoading?: boolean;
  loadingMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useApiState(options: UseApiStateOptions = {}) {
  const {
    showGlobalLoading = false,
    loadingMessage = "Loading...",
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<ApiState>({
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const { showLoading, hideLoading } = useGlobalLoading();

  const execute = useCallback(
    async <T>(
      apiCall: () => Promise<T>,
      context?: { component?: string; action?: string }
    ): Promise<T | null> => {
      try {
        setState((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          isSuccess: false,
        }));

        if (showGlobalLoading) {
          showLoading(loadingMessage);
        }

        const result = await apiCall();

        setState((prev) => ({ ...prev, isLoading: false, isSuccess: true }));

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error(String(error));

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorObj,
          isSuccess: false,
        }));

        // Handle error with context
        errorHandler.handleError(errorObj, context);

        if (onError) {
          onError(errorObj);
        }

        return null;
      } finally {
        if (showGlobalLoading) {
          hideLoading();
        }
      }
    },
    [
      showGlobalLoading,
      loadingMessage,
      onSuccess,
      onError,
      showLoading,
      hideLoading,
    ]
  );

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      isSuccess: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
