import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border-2 border-gray-400 bg-gray-700/60 text-gray-100 hover:bg-gray-600/80 hover:border-gray-300 hover:text-white backdrop-blur-sm shadow-lg transition-all duration-200",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-12 px-5 py-3",  // Increased from h-10 px-4 py-2
    sm: "h-10 rounded-md px-4", // Increased from h-9 px-3
    lg: "h-14 rounded-md px-10", // Increased from h-11 px-8
    icon: "h-12 w-12",          // Increased from h-10 w-10
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-base font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:scale-105 disabled:pointer-events-none disabled:opacity-50 active:scale-95 min-h-[44px]", // Changed from text-sm font-medium to text-base font-semibold, added min-h for touch targets
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button }; 