// Auth hooks
export { useAuth } from "./useAuth";
export type { LoginData, RegisterData } from "./useAuth";
export type { User } from "@/types";

// Financial data hooks
export {
  useFinancialSummary,
  useWorkingCapital,
  useWallet,
  useRecentTransactions,
  useScheduledTransfers,
} from "./useFinancialData";

// Form hooks
export { useForm } from "./useForm";
export type { UseFormOptions } from "./useForm";

// UI hooks
export { useShimmer } from "./useShimmer";
export type { UseShimmerOptions } from "./useShimmer";

// API state management hooks
export { useApiState } from "./useApiState";
export {
  useSuccessState,
  usePredefinedSuccess,
  SUCCESS_MESSAGES,
} from "./useSuccessState";
