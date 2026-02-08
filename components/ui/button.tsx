import React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", variant = "primary", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantClass =
      variant === "primary"
        ? "bg-white text-emerald-700 hover:bg-emerald-100"
        : variant === "ghost"
        ? "bg-transparent text-white"
        : "bg-transparent border border-white/20 text-white";

    return (
      <button ref={ref} {...props} className={cn(base, variantClass, className)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
