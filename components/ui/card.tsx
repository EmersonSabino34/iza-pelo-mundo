import React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn("rounded-2xl bg-white/5 shadow-sm", className)}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} {...props} className={cn("p-6", className)}>
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

export default Card;
