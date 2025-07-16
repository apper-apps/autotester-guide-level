import React from "react";
import { motion } from "framer-motion";
import NumberedCircle from "@/components/molecules/NumberedCircle";
import CodeBlock from "@/components/molecules/CodeBlock";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import SectionHeader from "@/components/molecules/SectionHeader";

const StepsList = ({ steps }) => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-surface-50 to-primary-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Main Steps"
          subtitle="Follow these 4 simple steps to get AutoTester running in your environment"
          icon="PlayCircle"
        />
        
        <div className="relative">
          {/* Progress line connecting all steps */}
          <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-300 to-transparent hidden lg:block"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="p-8 lg:p-10 card-hover bg-white/90 backdrop-blur-sm border-l-4 border-l-primary shadow-lg">
                  <div className="flex items-start gap-8">
                    {/* Enhanced numbered circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl font-display">
                          {step.number}
                        </span>
                      </div>
                      {/* Connection dot for progress line */}
                      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full hidden lg:block"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Enhanced header section */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display leading-tight">
                          {step.title}
                        </h3>
                        {step.timeEstimate && (
                          <Badge variant="secondary" className="self-start sm:self-center">
                            <span className="text-sm">⏱️ {step.timeEstimate}</span>
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-lg lg:text-xl mb-8 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Enhanced substeps section */}
{step?.subSteps && Array.isArray(step.subSteps) && step.subSteps.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 font-display flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full"></span>
                            Key Actions:
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-6">
                            <ul className="space-y-3">
                              {step.subSteps
                                .filter(subStep => subStep != null && subStep !== '')
                                .map((subStep, subIndex) => (
                                <li key={subStep?.id || subIndex} className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  </div>
                                  <span className="text-gray-700 leading-relaxed flex-1">
                                    {typeof subStep === 'string' ? subStep : subStep?.description || subStep?.title || 'No description'}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
)}
                    </div>
                  </div>
                  
                  {/* Step completion indicator */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center mt-8 lg:hidden">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-primary-400 rounded-full"></div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Completion indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: steps.length * 0.1 + 0.3 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-600 text-white rounded-full shadow-lg">
              <span className="text-lg font-semibold">🎉 You're all set!</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StepsList;