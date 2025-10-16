/**
 * API configuration constants
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:5737/api",
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: "/users/login",
  REGISTER: "/users/register",
  LOGOUT: "/users/logout",
  PROFILE: "/users/profile",

  // Financial endpoints
  FINANCIAL_SUMMARY: "/financial/summary",
  WORKING_CAPITAL: "/financial/working-capital",
  WALLET: "/financial/wallet",
  RECENT_TRANSACTIONS: "/financial/transactions/recent",
  SCHEDULED_TRANSFERS: "/financial/transfers/scheduled",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;
