"use client";

import { useState, useCallback } from "react";
import { z } from "zod";

export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<{ success: boolean; error?: any }>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateField = useCallback(
    (field: keyof T, value: any) => {
      if (!validationSchema) return true;

      try {
        const fieldSchema = (validationSchema as any).shape[field as string];
        if (fieldSchema) {
          fieldSchema.parse(value);
        }
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          return (error as any).errors[0]?.message || "Invalid value";
        }
        return "Invalid value";
      }
    },
    [validationSchema]
  );

  const validateForm = useCallback(() => {
    if (!validationSchema) return true;

    try {
      validationSchema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        (error as any).errors.forEach((err: any) => {
          const field = err.path[0] as keyof T;
          if (field) {
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
        return false;
      }
      return false;
    }
  }, [values, validationSchema]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      setIsSubmitting(true);
      setTouched({});

      // Validate form
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }

      try {
        const result = await onSubmit(values);
        if (result.success) {
          setValues(initialValues);
          setErrors({});
          setTouched({});
        }
        return result;
      } catch (error) {
        return { success: false, error };
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm, onSubmit, initialValues]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const getFieldProps = useCallback(
    (field: keyof T) => ({
      value: values[field] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(field, e.target.value);
      },
      onBlur: () => {
        setFieldTouched(field);
        const validationResult = validateField(field, values[field]);
        if (validationResult !== true) {
          setErrors((prev) => ({ ...prev, [field]: validationResult }));
        }
      },
      error: touched[field] ? errors[field] : undefined,
    }),
    [values, setValue, setFieldTouched, validateField, touched, errors]
  );

  return {
    values,
    errors,
    isSubmitting,
    touched,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    handleSubmit,
    reset,
    getFieldProps,
  };
}
