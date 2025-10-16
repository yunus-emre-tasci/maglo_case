// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// User Types
export interface User {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  isActive?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  id: string;
  fullName: string;
  email: string;
  token: string;
}

// Financial Summary Types
export interface FinancialChange {
  percentage: number;
  trend: "up" | "down";
}

export interface FinancialAmount {
  amount: number;
  currency: string;
  change: FinancialChange;
}

export interface FinancialSummary {
  totalBalance: FinancialAmount;
  totalExpense: FinancialAmount;
  totalSavings: FinancialAmount;
  lastUpdated: string;
}

// Working Capital Types
export interface WorkingCapitalData {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export interface WorkingCapitalSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface WorkingCapital {
  period: string;
  currency: string;
  data: WorkingCapitalData[];
  summary: WorkingCapitalSummary;
}

// Wallet Types
export interface WalletCard {
  id: string;
  name: string;
  type: "credit" | "debit";
  cardNumber: string;
  bank: string;
  network: string;
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
}

export interface Wallet {
  cards: WalletCard[];
}

// Transaction Types
export interface Transaction {
  id: string;
  name: string;
  business: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  count: number;
}

export interface RecentTransactions {
  transactions: Transaction[];
  summary: TransactionSummary;
}

// Scheduled Transfer Types
export interface ScheduledTransfer {
  id: string;
  name: string;
  date: string;
  amount: number;
  currency: string;
  status: "scheduled" | "completed" | "cancelled";
}

export interface ScheduledTransferSummary {
  totalScheduledAmount: number;
  count: number;
}

export interface ScheduledTransfers {
  transfers: ScheduledTransfer[];
  summary: ScheduledTransferSummary;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
}
