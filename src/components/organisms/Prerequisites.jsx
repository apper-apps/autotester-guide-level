import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import SectionHeader from "@/components/molecules/SectionHeader";

const Prerequisites = ({ prerequisites }) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
<SectionHeader
          title="Before You Start"
          subtitle="Make sure you have these essentials ready before starting the setup process"
          icon="CheckCircle"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {prerequisites.map((prereq, index) => (
            <motion.div
              key={prereq.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ApperIcon name={prereq.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 font-display">
                    {prereq.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {prereq.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prerequisites;