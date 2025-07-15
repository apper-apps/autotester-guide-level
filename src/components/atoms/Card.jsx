import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className = "", 
  variant = "default", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "rounded-lg border shadow-card";
  
  const variants = {
    default: "bg-white border-gray-200",
    elevated: "bg-white border-gray-200 shadow-lg",
    outline: "bg-transparent border-gray-300",
    ghost: "bg-transparent border-transparent"
  };

  return (
    <div
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;