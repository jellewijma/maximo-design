"use client";

/**
 * Button Component
 *
 * A reusable button component with primary and secondary variants.
 * The primary variant uses the electric blue (#2E00E5) color and is
 * intended for the main CTA "Bekijk catalogus" button.
 *
 * This is a Client Component to support event handlers like onClick.
 *
 * @example
 * ```tsx
 * // Primary button (blue background)
 * <Button variant="primary">Bekijk catalogus</Button>
 *
 * // Secondary button (outline style)
 * <Button variant="secondary">Learn more</Button>
 *
 * // As a link
 * <Button href="/catalogus" variant="primary">View Catalog</Button>
 * ```
 */

import React from "react";
import NextLink from "next/link";

/**
 * Button variant types
 */
type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Button size options
 */
type ButtonSize = "sm" | "md" | "lg";

/**
 * Base props shared by all button types
 */
interface BaseButtonProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Additional CSS classes */
  className?: string;
  /** Button content */
  children: React.ReactNode;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * Props when Button renders as a button element
 */
interface ButtonElementProps
  extends
    BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  /** When provided, renders as a link */
  href?: never;
}

/**
 * Props when Button renders as a link
 */
interface LinkButtonProps extends BaseButtonProps {
  /** URL to navigate to (renders as Link) */
  href: string;
}

type ButtonProps = ButtonElementProps | LinkButtonProps;

/**
 * Get CSS classes for the button based on variant and size
 */
function getButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  className?: string
): string {
  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "rounded-sm",
    "transition-all",
    "duration-200",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
  ];

  const variantClasses: Record<ButtonVariant, string[]> = {
    primary: [
      "bg-primary",
      "text-foreground",
      "hover:bg-primary/90",
      "focus-visible:ring-primary",
      disabled ? "opacity-50 cursor-not-allowed" : "hover-lift",
    ],
    secondary: [
      "border",
      "border-foreground",
      "text-foreground",
      "bg-transparent",
      "hover:bg-foreground/10",
      "focus-visible:ring-foreground",
      disabled ? "opacity-50 cursor-not-allowed" : "hover-lift",
    ],
    ghost: [
      "text-foreground",
      "bg-transparent",
      "hover:bg-foreground/10",
      "focus-visible:ring-foreground",
      disabled ? "opacity-50 cursor-not-allowed" : "",
    ],
  };

  const sizeClasses: Record<ButtonSize, string[]> = {
    sm: ["px-4", "py-2", "text-sm"],
    md: ["px-6", "py-3", "text-base"],
    lg: ["px-8", "py-4", "text-lg"],
  };

  return [
    ...baseClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    className || "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Button component that can render as a button or a link
 *
 * Note: Uses Next.js Link directly for flexibility.
 * The locale prefix is handled automatically by the middleware.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled = false,
  ...props
}: ButtonProps) {
  const classes = getButtonClasses(variant, size, disabled, className);

  // Render as a link if href is provided
  if ("href" in props && props.href) {
    return (
      <NextLink href={props.href} className={classes}>
        {children}
      </NextLink>
    );
  }

  // Render as a button
  const buttonProps = props as ButtonElementProps;
  return (
    <button className={classes} disabled={disabled} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
