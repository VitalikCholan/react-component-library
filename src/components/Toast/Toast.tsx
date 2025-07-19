"use client";

import React, { useState, useEffect, forwardRef } from "react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  /** The type of toast notification */
  type?: ToastType;
  /** The title/heading of the toast */
  title?: string;
  /** The main message content */
  message: string;
  /** Duration in milliseconds before auto-dismiss (0 = no auto-dismiss) */
  duration?: number;
  /** Whether to show a manual close button */
  showCloseButton?: boolean;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Custom CSS class name */
  className?: string;
  /** Whether the toast is visible */
  isVisible?: boolean;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      type = "info",
      title,
      message,
      duration = 5000,
      showCloseButton = true,
      onDismiss,
      className = "",
      isVisible = true,
    },
    ref
  ) => {
    const [isVisibleState, setIsVisibleState] = useState(isVisible);

    // Auto-dismiss functionality
    useEffect(() => {
      if (duration > 0 && isVisibleState) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, isVisibleState]);

    // Update visibility when prop changes
    useEffect(() => {
      setIsVisibleState(isVisible);
    }, [isVisible]);

    const handleDismiss = () => {
      setIsVisibleState(false);
      onDismiss?.();
    };

    const getIcon = () => {
      switch (type) {
        case "success":
          return <CheckCircleIcon className={styles.icon} />;
        case "error":
          return <XCircleIcon className={styles.icon} />;
        case "warning":
          return <ExclamationTriangleIcon className={styles.icon} />;
        case "info":
        default:
          return <InformationCircleIcon className={styles.icon} />;
      }
    };

    const getTypeStyles = () => {
      switch (type) {
        case "success":
          return styles.toastSuccess;
        case "error":
          return styles.toastError;
        case "warning":
          return styles.toastWarning;
        case "info":
        default:
          return styles.toastInfo;
      }
    };

    if (!isVisibleState) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={`${styles.toast} ${getTypeStyles()} ${className}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        <div className={styles.toastContent}>
          <div className={styles.toastIcon}>{getIcon()}</div>

          <div className={styles.toastBody}>
            {title && <div className={styles.toastTitle}>{title}</div>}
            <div className={styles.toastMessage}>{message}</div>
          </div>

          {showCloseButton && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleDismiss}
              aria-label="Close notification">
              <XMarkIcon className={styles.closeIcon} />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = "Toast";
