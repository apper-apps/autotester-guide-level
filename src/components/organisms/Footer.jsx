import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">AutoTester</span>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              You're all set! Your AutoTester environment is ready to revolutionize your testing workflow. 
              Start building better software with AI-powered automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={scrollToTop}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                <ApperIcon name="ArrowUp" className="w-4 h-4 mr-2" />
                Back to Top
              </Button>
              
              <Button
                variant="primary"
                className="bg-gradient-to-r from-primary to-accent"
              >
                <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
                Start Testing
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;