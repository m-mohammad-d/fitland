"use client";

import { cn } from "@/utils/utils";
import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "fill" | "outline" | "text";
  size?: "small" | "medium" | "large" | "xlarge";
  icon?: ReactNode;
}

const sizeClasses = {
  small: "px-3 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-5 py-3 text-lg",
  xlarge: "px-6 py-4 text-xl",
};

const variantClasses = {
  fill: "bg-primary text-white hover:bg-primary-600 active:bg-primary-700",
  outline:
    "border border-primary text-primary hover:border-primary-600 active:border-primary-700",
  text: "text-primary hover:text-primary-600 active:text-primary-700",
};
const baseStyle =
  "flex items-center justify-center gap-2 font-medium rounded-md transition disabled:bg-neutral-400 disabled:cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "fill", size = "medium", icon, className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyle,
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {icon && <span>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
