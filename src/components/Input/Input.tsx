"use client";

import React, { useState, forwardRef } from "react";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import styles from "./Input.module.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Whether the input can be cleared with an X button */
  clearable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      clearable = false,
      className = "",
      disabled = false,
      value: controlledValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(
      props.defaultValue || ""
    );

    // Determine if the component is controlled
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;
    const hasValue = value && String(value).length > 0;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      const newValue = "";
      if (!isControlled) {
        setInternalValue(newValue);
      }
      const syntheticEvent = {
        target: { value: newValue, name: props.name || "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={`${styles.inputWrapper} ${className}`}>
        <div className={styles.inputContainer}>
          <input
            ref={ref}
            type={inputType}
            className={`${styles.input} ${
              disabled ? styles.inputDisabled : ""
            }`}
            disabled={disabled}
            value={value}
            onChange={handleInputChange}
            {...props}
          />

          <div className={styles.inputActions}>
            {/* Password visibility toggle */}
            {isPasswordType && (
              <button
                type="button"
                className={styles.actionButton}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={disabled}>
                {showPassword ? (
                  <EyeSlashIcon className={styles.icon} />
                ) : (
                  <EyeIcon className={styles.icon} />
                )}
              </button>
            )}

            {/* Clear button */}
            {clearable && hasValue && !disabled && (
              <button
                type="button"
                className={styles.actionButton}
                onClick={handleClear}
                aria-label="Clear input">
                <XMarkIcon className={styles.icon} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
