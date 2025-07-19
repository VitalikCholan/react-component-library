"use client";

import React, { useState, useEffect, forwardRef } from "react";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import styles from "./SidebarMenu.module.css";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export interface SidebarMenuProps {
  /** Whether the sidebar is open */
  isOpen: boolean;
  /** Array of menu items */
  items: MenuItem[];
  /** Callback when sidebar is closed */
  onClose: () => void;
  /** Callback when a menu item is clicked */
  onItemClick?: (item: MenuItem) => void;
  /** Custom CSS class name */
  className?: string;
  /** Width of the sidebar */
  width?: string;
  /** Whether to show backdrop */
  showBackdrop?: boolean;
}

export const SidebarMenu = forwardRef<HTMLDivElement, SidebarMenuProps>(
  (
    {
      isOpen,
      items,
      onClose,
      onItemClick,
      className = "",
      width = "320px",
      showBackdrop = true,
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    // Close sidebar when Escape key is pressed
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        // Prevent body scroll when sidebar is open
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    const toggleExpanded = (itemId: string) => {
      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    };

    const handleBackdropClick = (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    const renderMenuItem = (item: MenuItem, level: number = 0) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.has(item.id);
      const isActive = false; // You can implement active state logic here

      return (
        <div key={item.id} className={styles.menuItemContainer}>
          <div
            className={`${styles.menuItem} ${isActive ? styles.active : ""} ${
              level > 0 ? styles.subMenuItem : ""
            }`}
            style={{ paddingLeft: `${1 + level * 1.5}rem` }}
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.id);
              } else {
                // Handle item click
                onItemClick?.(item);
                onClose();
              }
            }}>
            {item.icon && <div className={styles.menuIcon}>{item.icon}</div>}

            <span className={styles.menuLabel}>{item.label}</span>

            {hasChildren && (
              <ChevronRightIcon
                className={`${styles.expandIcon} ${
                  isExpanded ? styles.expanded : ""
                }`}
              />
            )}
          </div>

          {hasChildren && (
            <div
              className={`${styles.subMenu} ${
                isExpanded ? styles.expanded : ""
              }`}>
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <>
        {/* Backdrop */}
        {showBackdrop && isOpen && (
          <div
            className={styles.backdrop}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          ref={ref}
          className={`${styles.sidebar} ${
            isOpen ? styles.open : ""
          } ${className}`}
          style={{ width }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu">
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>Menu</h2>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close menu">
              <XMarkIcon className={styles.closeIcon} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className={styles.menuContainer}>
            {items.map((item) => renderMenuItem(item))}
          </nav>
        </div>
      </>
    );
  }
);

SidebarMenu.displayName = "SidebarMenu";
