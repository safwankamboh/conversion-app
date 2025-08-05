"use client";

import React, {
  forwardRef,
  SelectHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, ChevronDown } from "lucide-react";

export interface FormSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIcon;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outlined";
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
  children?: ReactNode;
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      size = "md",
      variant = "default",
      fullWidth = false,
      disabled = false,
      required = false,
      className,
      containerClassName,
      labelClassName,
      errorClassName,
      helperTextClassName,
      children,
      options = [],
      placeholder,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    const variantClasses = {
      default: "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
      filled: "border-transparent bg-gray-50 dark:bg-gray-700",
      outlined: "border-2 border-gray-300 dark:border-gray-600 bg-transparent",
    };

    const baseSelectClasses = cn(
      "w-full rounded-lg transition-all duration-200 appearance-none",
      "focus:outline-none focus:ring-0",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "text-gray-900 dark:text-white",
      sizeClasses[size],
      variantClasses[variant],
      error && "border-red-500 focus:ring-red-500",
      fullWidth && "w-full",
      LeftIcon && "pl-10",
      "pr-10", // Space for chevron icon
      className
    );

    const containerClasses = cn(
      "flex flex-col space-y-1",
      fullWidth && "w-full",
      containerClassName
    );

    const labelClasses = cn(
      "text-sm font-medium text-gray-700 dark:text-gray-300",
      required && 'after:content-["*"] after:ml-1 after:text-red-500',
      labelClassName
    );

    const errorClasses = cn(
      "text-sm text-red-500 dark:text-red-400",
      errorClassName
    );

    const helperTextClasses = cn(
      "text-sm text-gray-500 dark:text-gray-400",
      helperTextClassName
    );

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={selectId} className={labelClasses}>
            {label}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <LeftIcon
                className={cn(
                  "h-4 w-4 text-gray-400",
                  size === "lg" && "h-5 w-5",
                  size === "sm" && "h-3.5 w-3.5"
                )}
              />
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            className={baseSelectClasses}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-helper`
                : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.length > 0
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400",
                size === "lg" && "h-5 w-5",
                size === "sm" && "h-3.5 w-3.5"
              )}
            />
          </div>
        </div>

        {error && (
          <p id={`${selectId}-error`} className={errorClasses}>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${selectId}-helper`} className={helperTextClasses}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
