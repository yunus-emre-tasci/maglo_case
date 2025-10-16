"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const resetError = useCallback(() => {
    setHasError(false);
    setError(undefined);
  }, []);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("ErrorBoundary caught an error:", error);

      // Error tracking service'e gönder (Sentry, LogRocket, vb.)
      if (typeof window !== "undefined") {
        // Burada error tracking servisi entegrasyonu yapılabilir
        console.error("Error details:", {
          error: error.message,
          stack: error.error?.stack,
          componentStack: error.error?.stack,
        });
      }

      setHasError(true);
      setError(error.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error(
        "ErrorBoundary caught an unhandled promise rejection:",
        event
      );
      setHasError(true);
      setError(new Error(event.reason));
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  if (hasError && error) {
    if (fallback) {
      const FallbackComponent = fallback;
      return <FallbackComponent error={error} resetError={resetError} />;
    }

    return <DefaultErrorFallback error={error} resetError={resetError} />;
  }

  return <>{children}</>;
}

// Default Error Fallback Component
function DefaultErrorFallback({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-4">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h2>

        <p className="text-gray-600 mb-4">
          We encountered an unexpected error. Please try refreshing the page.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="space-y-2">
          <button
            onClick={resetError}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

// Dashboard-specific Error Fallback
export function DashboardErrorFallback({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Dashboard Error
        </h3>
        <p className="text-gray-600 mb-4">
          Unable to load dashboard data. Please try again.
        </p>
        <button
          onClick={resetError}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </button>
      </div>
    </div>
  );
}

// Chart-specific Error Fallback
export function ChartErrorFallback({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="text-center">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
        <h3 className="text-sm font-medium text-gray-900 mb-2">Chart Error</h3>
        <p className="text-xs text-gray-600 mb-3">Unable to load chart data.</p>
        <button
          onClick={resetError}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </button>
      </div>
    </div>
  );
}
