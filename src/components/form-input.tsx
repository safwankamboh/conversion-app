"use client";

import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
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
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // children?: ReactNode;
  type?: string; // Allow type to be specified, e.g., "text", "email", "password"
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
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
      onLeftIconClick,
      onRightIconClick,
      value,
      onChange,
      children,
      id,
      type = "text",
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

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

    const baseInputClasses = cn(
      "w-full rounded-lg transition-all duration-200",
      "focus:outline-none focus:ring-0",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      "text-gray-900 dark:text-white",
      sizeClasses[size],
      variantClasses[variant],
      error && "border-red-500 focus:ring-red-500",
      fullWidth && "w-full",
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
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <LeftIcon
                className={cn(
                  "h-4 w-4 text-gray-400",
                  onLeftIconClick && "cursor-pointer hover:text-gray-600",
                  size === "lg" && "h-5 w-5",
                  size === "sm" && "h-3.5 w-3.5"
                )}
                onClick={onLeftIconClick}
              />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            value={value}
            onChange={onChange}
            type={type}
            className={cn(
              baseInputClasses,
              LeftIcon && "pl-10",
              RightIcon && "pr-10"
            )}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            // {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            {...(type === "number" ? { inputMode: "numeric", pattern: "[0-9]*" } : {})}

            {...props}
          />

          {RightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <RightIcon
                className={cn(
                  "h-4 w-4 text-gray-400",
                  onRightIconClick && "cursor-pointer hover:text-gray-600",
                  size === "lg" && "h-5 w-5",
                  size === "sm" && "h-3.5 w-3.5"
                )}
                onClick={onRightIconClick}
              />
            </div>
          )}

          {children}
        </div>

        {error && (
          <p id={`${inputId}-error`} className={errorClasses}>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className={helperTextClasses}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
