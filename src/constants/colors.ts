/**
 * Color constants for the application
 */

export const COLORS = {
  // Primary colors
  PRIMARY: "#C8EE44",
  PRIMARY_DARK: "#A8CC2A",
  PRIMARY_LIGHT: "#E8FF6A",

  // Secondary colors
  SECONDARY: "#29A073",
  SECONDARY_DARK: "#1E7A5A",
  SECONDARY_LIGHT: "#4AB88A",

  // Neutral colors
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  GRAY_50: "#FAFAFA",
  GRAY_100: "#F5F5F5",
  GRAY_200: "#EEEEEE",
  GRAY_300: "#E0E0E0",
  GRAY_400: "#BDBDBD",
  GRAY_500: "#9E9E9E",
  GRAY_600: "#757575",
  GRAY_700: "#616161",
  GRAY_800: "#424242",
  GRAY_900: "#212121",

  // Text colors
  TEXT_PRIMARY: "#1B212D",
  TEXT_SECONDARY: "#78778B",
  TEXT_DISABLED: "#929EAE",
  TEXT_INVERSE: "#FFFFFF",

  // Status colors
  SUCCESS: "#4CAF50",
  SUCCESS_LIGHT: "#C8E6C9",
  SUCCESS_DARK: "#388E3C",

  WARNING: "#FF9800",
  WARNING_LIGHT: "#FFE0B2",
  WARNING_DARK: "#F57C00",

  ERROR: "#F44336",
  ERROR_LIGHT: "#FFCDD2",
  ERROR_DARK: "#D32F2F",

  INFO: "#2196F3",
  INFO_LIGHT: "#BBDEFB",
  INFO_DARK: "#1976D2",

  // Background colors
  BACKGROUND_PRIMARY: "#FFFFFF",
  BACKGROUND_SECONDARY: "#FAFAFA",
  BACKGROUND_TERTIARY: "#F5F5F5",

  // Border colors
  BORDER_LIGHT: "#E0E0E0",
  BORDER_MEDIUM: "#BDBDBD",
  BORDER_DARK: "#757575",

  // Chart colors
  CHART_INCOME: "#29A073",
  CHART_EXPENSE: "#C8EE44",
  CHART_PROFIT: "#4CAF50",
  CHART_LOSS: "#F44336",

  // Card colors
  CARD_BACKGROUND: "#FFFFFF",
  CARD_BORDER: "#E0E0E0",
  CARD_SHADOW: "rgba(0, 0, 0, 0.1)",

  // Gradient colors
  GRADIENT_PRIMARY: "linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)",
  GRADIENT_SECONDARY: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  GRADIENT_SUCCESS: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
  GRADIENT_ERROR: "linear-gradient(135deg, #F44336 0%, #d32f2f 100%)",
} as const;

export const THEME_COLORS = {
  LIGHT: {
    background: COLORS.BACKGROUND_PRIMARY,
    surface: COLORS.WHITE,
    text: COLORS.TEXT_PRIMARY,
    textSecondary: COLORS.TEXT_SECONDARY,
    border: COLORS.BORDER_LIGHT,
  },
  DARK: {
    background: COLORS.GRAY_900,
    surface: COLORS.GRAY_800,
    text: COLORS.WHITE,
    textSecondary: COLORS.GRAY_400,
    border: COLORS.GRAY_700,
  },
} as const;
