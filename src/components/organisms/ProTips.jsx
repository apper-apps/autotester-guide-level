import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import SectionHeader from "@/components/molecules/SectionHeader";

const ProTips = ({ tips }) => {
  const [expandedTip, setExpandedTip] = useState(null);

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Pro Tips"
          subtitle="Expert recommendations to help you get the most out of AutoTester"
          icon="Lightbulb"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <button
                  onClick={() => toggleTip(tip.Id)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name={tip.icon} className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 font-display">
                          {tip.title}
                        </h3>
                        <motion.div
                          animate={{ rotate: expandedTip === tip.Id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ApperIcon name="ChevronDown" className="w-5 h-5 text-gray-500" />
                        </motion.div>
                      </div>
                      
                      <span className="text-sm text-primary font-medium capitalize">
                        {tip.category}
                      </span>
                    </div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedTip === tip.Id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="pl-14 text-gray-600 leading-relaxed">
                          {tip.content}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProTips;