import toast from "react-hot-toast";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

export class AppError extends Error {
  public status?: number;
  public code?: string;
  public details?: unknown;

  constructor(
    message: string,
    status?: number,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// Error types
export enum ErrorType {
  NETWORK = "NETWORK",
  API = "API",
  VALIDATION = "VALIDATION",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  NOT_FOUND = "NOT_FOUND",
  SERVER = "SERVER",
  UNKNOWN = "UNKNOWN",
}

// Error severity levels
export enum ErrorSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: Date;
  userAgent?: string;
  url?: string;
}

// Error log state
let errorLog: Array<{
  error: Error;
  context: ErrorContext;
  severity: ErrorSeverity;
  timestamp: Date;
}> = [];

// Error classification function
export function classifyError(error: unknown): {
  type: ErrorType;
  severity: ErrorSeverity;
  userMessage: string;
} {
  // Network errors
  if (
    error instanceof Error &&
    (error.name === "NetworkError" || error.message.includes("fetch"))
  ) {
    return {
      type: ErrorType.NETWORK,
      severity: ErrorSeverity.MEDIUM,
      userMessage:
        "Network connection error. Please check your internet connection.",
    };
  }

  // API errors
  if (error && typeof error === "object" && "status" in error && error.status) {
    switch (error.status) {
      case 401:
        return {
          type: ErrorType.AUTHENTICATION,
          severity: ErrorSeverity.HIGH,
          userMessage: "Please sign in again to continue.",
        };
      case 403:
        return {
          type: ErrorType.AUTHORIZATION,
          severity: ErrorSeverity.HIGH,
          userMessage: "You don't have permission to perform this action.",
        };
      case 404:
        return {
          type: ErrorType.NOT_FOUND,
          severity: ErrorSeverity.MEDIUM,
          userMessage: "The requested resource was not found.",
        };
      case 422:
        return {
          type: ErrorType.VALIDATION,
          severity: ErrorSeverity.LOW,
          userMessage: "Please check your input and try again.",
        };
      case 500:
      case 502:
      case 503:
        return {
          type: ErrorType.SERVER,
          severity: ErrorSeverity.HIGH,
          userMessage: "Server error. Please try again later.",
        };
      default:
        return {
          type: ErrorType.API,
          severity: ErrorSeverity.MEDIUM,
          userMessage: "An error occurred. Please try again.",
        };
    }
  }

  // React Query errors
  if (error instanceof Error && error.message?.includes("Failed to fetch")) {
    return {
      type: ErrorType.NETWORK,
      severity: ErrorSeverity.MEDIUM,
      userMessage: "Unable to connect to the server. Please try again.",
    };
  }

  // Default
  return {
    type: ErrorType.UNKNOWN,
    severity: ErrorSeverity.MEDIUM,
    userMessage: "An unexpected error occurred. Please try again.",
  };
}

// Log error locally
function logError(
  error: Error,
  context: ErrorContext,
  severity: ErrorSeverity
): void {
  const errorEntry = {
    error,
    context: {
      ...context,
      timestamp: new Date(),
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : undefined,
      url: typeof window !== "undefined" ? window.location.href : undefined,
    },
    severity,
    timestamp: new Date(),
  };

  errorLog.push(errorEntry);

  // Keep only last 100 errors
  if (errorLog.length > 100) {
    errorLog = errorLog.slice(-100);
  }

  // Console log for development
  if (process.env.NODE_ENV === "development") {
    console.group("🚨 Error Handler");
    console.error("Error:", error);
    console.error("Context:", context);
    console.error("Classification:", classifyError(error));
    console.groupEnd();
  }
}

// Show error toast
function showErrorToast(message: string, severity: ErrorSeverity): void {
  const toastOptions = {
    duration: severity === ErrorSeverity.CRITICAL ? 8000 : 4000,
    style: {
      background: severity === ErrorSeverity.CRITICAL ? "#DC2626" : "#EF4444",
      color: "#FFFFFF",
    },
  };

  toast.error(message, toastOptions);
}

// Track error with external services
function trackError(
  error: Error,
  context: ErrorContext,
  classification: { type: ErrorType; severity: ErrorSeverity }
): void {
  // Here you can integrate with error tracking services
  // Examples: Sentry, LogRocket, Bugsnag, etc.

  if (typeof window !== "undefined") {
    // Example Sentry integration:
    // Sentry.captureException(error, {
    //   tags: {
    //     errorType: classification.type,
    //     severity: classification.severity,
    //   },
    //   extra: context,
    // });
  }

  // Suppress unused parameter warnings
  void error;
  void context;
  void classification;
}

// Handle error with context
export function handleError(
  error: Error,
  context: ErrorContext = {},
  showToast: boolean = true
): void {
  const classification = classifyError(error);

  // Log error
  logError(error, context, classification.severity);

  // Show toast notification
  if (showToast) {
    showErrorToast(classification.userMessage, classification.severity);
  }

  // Track error (Sentry, LogRocket, etc.)
  trackError(error, context, classification);
}

// Get error log
export function getErrorLog() {
  return errorLog;
}

// Clear error log
export function clearErrorLog() {
  errorLog = [];
}

// Create API error
export function createApiError(
  message: string,
  status: number,
  code?: string,
  details?: unknown
): AppError {
  return new AppError(message, status, code, details);
}

// Export error handler object for backward compatibility
export const errorHandler = {
  handleError,
  createApiError,
  getErrorLog,
  clearErrorLog,
};

// React Query error handler
export const handleQueryError = (
  error: unknown,
  context: ErrorContext = {}
) => {
  handleError(
    error instanceof Error ? error : new Error(String(error)),
    context,
    true
  );
};

// API error handler
export const handleApiError = (error: unknown, context: ErrorContext = {}) => {
  handleError(
    error instanceof Error ? error : new Error(String(error)),
    context,
    true
  );
};

// Silent error handler (no toast)
export const handleSilentError = (
  error: unknown,
  context: ErrorContext = {}
) => {
  handleError(
    error instanceof Error ? error : new Error(String(error)),
    context,
    false
  );
};
