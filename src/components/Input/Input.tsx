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
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(props.value || props.defaultValue || "");

    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;
    const hasValue = value && String(value).length > 0;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    const handleClear = () => {
      setValue("");
      const syntheticEvent = {
        target: { value: "", name: props.name || "" },
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange?.(syntheticEvent);
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
