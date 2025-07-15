import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No content available",
  message = "There's nothing to display right now. Check back later or try refreshing the page.",
  icon = "FileText",
  actionLabel = "Refresh Page",
  onAction,
  className = ""
}) => {
  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex flex-col items-center justify-center min-h-[400px] p-8 ${className}`}
    >
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3 font-display">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>
        
        <Button
          onClick={handleAction}
          variant="primary"
          className="inline-flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          {actionLabel}
        </Button>
      </div>
    </motion.div>
  );
};

export default Empty;