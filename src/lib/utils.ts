import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency formatting
export function formatCurrency(
  amount: number,
  currency: string = "TRY",
  locale: string = "tr-TR",
  decimalPlaces: number = 2
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(amount);
}

// Number formatting with dot as thousand separator
export function formatNumberWithDots(
  amount: number,
  decimalPlaces: number = 2
): string {
  return amount.toLocaleString("tr-TR", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}

// Date formatting
export function formatDate(
  dateString: string,
  locale: string = "en-US"
): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Date formatting for transactions
export function formatTransactionDate(
  dateString: string,
  locale: string = "en-US"
): string {
  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Percentage formatting
export function formatPercentage(
  value: number,
  locale: string = "tr-TR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

// Card number formatting
export function formatCardNumber(cardNumber: string): string {
  return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
}

// Format card number with hidden last 8 digits
export function formatCardNumberHidden(cardNumber: string): string {
  // Remove spaces and get the card number
  const cleanNumber = cardNumber.replace(/\s/g, "");

  // If card number is 16 digits, show first 8 and hide last 8
  if (cleanNumber.length === 16) {
    const first8 = cleanNumber.substring(0, 8);
    const last8 = "**** ****";
    return `${first8} ${last8}`;
  }

  // If card number is shorter, just format normally
  return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
}

// Get trend color
export function getTrendColor(trend: "up" | "down"): string {
  return trend === "up" ? "text-green-600" : "text-red-600";
}

// Get trend icon
export function getTrendIcon(trend: "up" | "down"): string {
  return trend === "up" ? "↗" : "↘";
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate skeleton loading array
export function generateSkeletonArray(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i);
}
