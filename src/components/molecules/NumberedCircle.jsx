import React from "react";
import { cn } from "@/utils/cn";

const NumberedCircle = ({ 
  number, 
  size = "lg", 
  className = "" 
}) => {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl"
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold font-display shadow-lg flex-shrink-0",
        sizes[size],
        className
      )}
    >
      {number}
    </div>
  );
};

export default NumberedCircle;