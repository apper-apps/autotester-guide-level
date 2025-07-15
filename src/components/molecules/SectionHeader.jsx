import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const SectionHeader = ({ 
  title, 
  subtitle, 
  icon,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-center mb-12 ${className}`}
    >
      {icon && (
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-8 h-8 text-primary" />
        </div>
      )}
      
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-display">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;