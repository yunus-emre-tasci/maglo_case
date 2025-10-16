// Formatting utilities
export {
  formatCurrency,
  formatNumberWithDots,
  formatCardNumber,
  formatCardNumberHidden,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber,
} from "./formatting";

// Validation utilities
export {
  emailSchema,
  passwordSchema,
  fullNameSchema,
  loginSchema,
  registerSchema,
  amountSchema,
  dateSchema,
  validateEmail,
  validatePassword,
  validateFullName,
  validateAmount,
  validateDate,
  validateFormField,
  validateEmailExists,
  validateUsernameExists,
} from "./validation";

// Helper utilities
export {
  debounce,
  throttle,
  generateId,
  generateRandomColor,
  getInitials,
  capitalize,
  slugify,
  isEmpty,
  deepClone,
  deepMerge,
  sleep,
  retry,
  isBrowser,
  isServer,
  getUserAgent,
  isMobile,
  isTablet,
  isDesktop,
  formatBytes,
  randomBetween,
  shuffleArray,
  groupBy,
  sortBy,
} from "./helpers";

// Storage utilities
export {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearStorage,
  getStorageSize,
  isStorageAvailable,
  getSessionItem,
  setSessionItem,
  removeSessionItem,
  clearSession,
  getCookie,
  setCookie,
  deleteCookie,
} from "./storage";
