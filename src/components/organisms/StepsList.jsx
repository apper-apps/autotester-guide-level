import React from "react";
import { motion } from "framer-motion";
import NumberedCircle from "@/components/molecules/NumberedCircle";
import CodeBlock from "@/components/molecules/CodeBlock";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import SectionHeader from "@/components/molecules/SectionHeader";

const StepsList = ({ steps }) => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Setup Steps"
          subtitle="Follow these 4 simple steps to get AutoTester running in your environment"
          icon="PlayCircle"
        />
        
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 card-hover">
                <div className="flex items-start gap-6">
                  <NumberedCircle number={step.number} />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 font-display">
                        {step.title}
                      </h3>
                      {step.timeEstimate && (
                        <Badge variant="secondary">
                          {step.timeEstimate}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {step.subSteps && step.subSteps.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 font-display">
                          Sub-steps:
                        </h4>
                        <ul className="space-y-2">
                          {step.subSteps.map((subStep, subIndex) => (
                            <li key={subIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{subStep}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {step.codeExample && (
                      <CodeBlock
                        code={step.codeExample}
                        language="bash"
                        title="Command"
                      />
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsList;