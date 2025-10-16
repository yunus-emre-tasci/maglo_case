"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface GlobalLoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (loading: boolean, message?: string) => void;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const GlobalLoadingContext = createContext<
  GlobalLoadingContextType | undefined
>(undefined);

export function GlobalLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const setLoading = useCallback(
    (loading: boolean, message: string = "Loading...") => {
      setIsLoading(loading);
      setLoadingMessage(message);
    },
    []
  );

  const showLoading = useCallback(
    (message: string = "Loading...") => {
      setLoadingMessage(message);
      setIsLoading(true);
    },
    [setLoading]
  );

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const value: GlobalLoadingContextType = {
    isLoading,
    loadingMessage,
    setLoading,
    showLoading,
    hideLoading,
  };

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3 shadow-xl">
            <LoadingSpinner size="md" />
            <span className="text-gray-700 font-medium">{loadingMessage}</span>
          </div>
        </div>
      )}
    </GlobalLoadingContext.Provider>
  );
}

export function useGlobalLoading() {
  const context = useContext(GlobalLoadingContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalLoading must be used within a GlobalLoadingProvider"
    );
  }
  return context;
}
