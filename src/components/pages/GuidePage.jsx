import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProTips from "@/components/organisms/ProTips";
import Prerequisites from "@/components/organisms/Prerequisites";
import Footer from "@/components/organisms/Footer";
import StepsList from "@/components/organisms/StepsList";
import Header from "@/components/organisms/Header";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { getPrerequisites, getProTips, getSteps } from "@/services/api/guideService";

const GuidePage = () => {
  const [prerequisites, setPrerequisites] = useState([]);
  const [steps, setSteps] = useState([]);
  const [proTips, setProTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationLoading, setValidationLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationResults, setValidationResults] = useState(null);
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [prereqData, stepsData, tipsData] = await Promise.all([
        getPrerequisites(),
        getSteps(),
        getProTips()
      ]);
      
      setPrerequisites(prereqData);
      setSteps(stepsData);
      setProTips(tipsData);
    } catch (err) {
      setError("Failed to load guide content. Please try again.");
      console.error("Error loading guide data:", err);
    } finally {
      setLoading(false);
    }
};

  const runValidation = async () => {
    try {
      setValidationLoading(true);
      setError("");
      
      // Simulate validation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation results
      const mockResults = {
        validationSummary: {
          successMessages: "All success messages are properly displayed and formatted.",
          errorHandling: "Error scenarios are handled gracefully with appropriate user feedback.",
          fieldRequirements: "All required fields are validated and optional fields are clearly marked.",
          navigationFlows: "Navigation between steps works correctly and maintains user context."
        },
        timestamp: new Date().toISOString()
      };
      
      setValidationResults(mockResults);
      setShowValidation(true);
    } catch (err) {
      setError("Failed to run validation tests. Please try again.");
      console.error("Validation error:", err);
    } finally {
      setValidationLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Error
            title="Failed to Load Guide"
            message={error}
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }

  if (prerequisites.length === 0 && steps.length === 0 && proTips.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Empty
            title="No Guide Content Available"
            message="The guide content is not available at the moment. Please check back later."
            icon="FileText"
            onAction={loadData}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Header />
      
      {prerequisites.length > 0 && (
        <Prerequisites prerequisites={prerequisites} />
      )}
      
      {steps.length > 0 && (
        <StepsList steps={steps} />
      )}
      
{proTips.length > 0 && (
        <ProTips tips={proTips} />
      )}
      
      {/* Step 2: Validation Flow & Test Cases */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
              Step 2: Validate Flow & Generate Test Cases
            </h2>
            <p className="text-gray-600 mb-6">
              Review recorded flow process and run comprehensive validation tests.
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={runValidation}
                disabled={validationLoading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {validationLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Running Validation...
                  </>
                ) : (
                  <>
                    <ApperIcon name="CheckCircle" className="w-4 h-4" />
                    Run Validation Tests
                  </>
                )}
              </button>
              
              {showValidation && (
                <button
                  onClick={() => setShowValidation(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <ApperIcon name="EyeOff" className="w-4 h-4" />
                  Hide Results
                </button>
              )}
            </div>
            
            {showValidation && validationResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Success Messages</h3>
                    <p className="text-sm text-green-700">
                      {validationResults.validationSummary.successMessages}
                    </p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-2">Error Handling</h3>
                    <p className="text-sm text-red-700">
                      {validationResults.validationSummary.errorHandling}
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Field Requirements</h3>
                    <p className="text-sm text-blue-700">
                      {validationResults.validationSummary.fieldRequirements}
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-2">Navigation Flows</h3>
                    <p className="text-sm text-purple-700">
                      {validationResults.validationSummary.navigationFlows}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Validation Checklist</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
                      Validate success messages
                    </li>
                    <li className="flex items-center gap-2">
                      <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
                      Check error handling
                    </li>
                    <li className="flex items-center gap-2">
                      <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
                      Validate field requirements
                    </li>
                    <li className="flex items-center gap-2">
                      <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-600" />
                      Confirm navigation flows
                    </li>
                  </ul>
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  Validation completed at {new Date(validationResults.timestamp).toLocaleString()}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default GuidePage;