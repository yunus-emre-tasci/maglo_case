import { z } from "zod";

/**
 * Common validation schemas
 */
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  );

export const fullNameSchema = z
  .string()
  .min(2, "Full name must be at least 2 characters")
  .max(50, "Full name must be less than 50 characters")
  .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces");

/**
 * Form validation schemas
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

/**
 * Financial data validation schemas
 */
export const amountSchema = z
  .number()
  .positive("Amount must be positive")
  .max(999999999, "Amount is too large");

export const dateSchema = z
  .string()
  .refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  });

/**
 * Utility validation functions
 */
export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function validatePassword(password: string): boolean {
  return passwordSchema.safeParse(password).success;
}

export function validateFullName(fullName: string): boolean {
  return fullNameSchema.safeParse(fullName).success;
}

export function validateAmount(amount: number): boolean {
  return amountSchema.safeParse(amount).success;
}

export function validateDate(date: string): boolean {
  return dateSchema.safeParse(date).success;
}

/**
 * Form field validation
 */
export function validateFormField<T>(
  value: T,
  schema: z.ZodSchema<T>
): string | undefined {
  try {
    schema.parse(value);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (error as any).errors[0]?.message;
    }
    return "Invalid value";
  }
}

/**
 * Async validation functions
 */
export async function validateEmailExists(email: string): Promise<boolean> {
  // This would typically make an API call to check if email exists
  // For now, we'll simulate with a timeout
  await new Promise((resolve) => setTimeout(resolve, 100));
  return !email.includes("test@example.com");
}

export async function validateUsernameExists(
  username: string
): Promise<boolean> {
  // This would typically make an API call to check if username exists
  await new Promise((resolve) => setTimeout(resolve, 100));
  return !username.includes("testuser");
}
