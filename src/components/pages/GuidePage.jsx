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
import { generateTestCases, getPrerequisites, getProTips, getSteps, validateErrorHandling, validateFieldRequirements, validateNavigationFlows, validateSuccessMessages } from "@/services/api/guideService";

const GuidePage = () => {
  const [prerequisites, setPrerequisites] = useState([]);
  const [steps, setSteps] = useState([]);
  const [proTips, setProTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationData, setValidationData] = useState(null);
  const [validationLoading, setValidationLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
const validateStepsData = (data) => {
    if (!Array.isArray(data)) return [];
    
    return data.map(step => ({
      ...step,
      subSteps: Array.isArray(step?.subSteps) 
        ? step.subSteps.filter(subStep => subStep != null && subStep !== '')
        : []
    }));
  };

  const validatePrerequisitesData = (data) => {
    if (!Array.isArray(data)) return [];
    return data.filter(item => item && (item.title || item.description));
  };

  const validateProTipsData = (data) => {
    if (!Array.isArray(data)) return [];
    return data.filter(item => item && (item.title || item.description));
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [prereqData, stepsData, tipsData] = await Promise.all([
        getPrerequisites(),
        getSteps(),
        getProTips()
      ]);
      
      // Validate and sanitize data before setting state
      const validatedPrerequisites = validatePrerequisitesData(prereqData);
      const validatedSteps = validateStepsData(stepsData);
      const validatedProTips = validateProTipsData(tipsData);
      
      setPrerequisites(validatedPrerequisites);
      setSteps(validatedSteps);
      setProTips(validatedProTips);
    } catch (err) {
      setError("Failed to load guide content. Please try again.");
      console.error("Error loading guide data:", err);
    } finally {
      setLoading(false);
    }
};

  const runValidation = async (type) => {
    try {
      setValidationLoading(true);
      setValidationError("");
      
      let result;
      switch (type) {
        case 'success':
          result = await validateSuccessMessages();
          break;
        case 'error':
          result = await validateErrorHandling();
          break;
        case 'fields':
          result = await validateFieldRequirements();
          break;
        case 'navigation':
          result = await validateNavigationFlows();
          break;
        case 'all':
          result = await generateTestCases();
          break;
        default:
          throw new Error('Unknown validation type');
      }
      
      setValidationData(result);
    } catch (err) {
      setValidationError(`Failed to run ${type} validation. Please try again.`);
      console.error(`Error running ${type} validation:`, err);
    } finally {
      setValidationLoading(false);
    }
  };

  const clearValidation = () => {
    setValidationData(null);
    setValidationError("");
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
      
      {/* Validation Dashboard */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Step 2: Validate Flow & Generate Test Cases
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Review your recorded flow — AutoTester analyzes everything you captured and generates comprehensive test scenarios
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Validation Controls */}
            <div className="bg-white rounded-xl shadow-card p-6 mb-8">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
                Validation Controls
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <button
                  onClick={() => runValidation('success')}
                  disabled={validationLoading}
                  className="flex items-center justify-center px-4 py-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="CheckCircle" size={20} className="mr-2" />
                  Success Messages
                </button>
                
                <button
                  onClick={() => runValidation('error')}
                  disabled={validationLoading}
                  className="flex items-center justify-center px-4 py-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="AlertCircle" size={20} className="mr-2" />
                  Error Handling
                </button>
                
                <button
                  onClick={() => runValidation('fields')}
                  disabled={validationLoading}
                  className="flex items-center justify-center px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="FileCheck" size={20} className="mr-2" />
                  Field Requirements
                </button>
                
                <button
                  onClick={() => runValidation('navigation')}
                  disabled={validationLoading}
                  className="flex items-center justify-center px-4 py-3 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="Navigation" size={20} className="mr-2" />
                  Navigation Flows
                </button>
                
                <button
                  onClick={() => runValidation('all')}
                  disabled={validationLoading}
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="Zap" size={20} className="mr-2" />
                  Generate All Tests
                </button>
              </div>

              {validationLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-gray-600">Running validation...</span>
                </div>
              )}

              {validationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <ApperIcon name="AlertTriangle" size={20} className="text-red-600 mr-2" />
                    <span className="text-red-800">{validationError}</span>
                  </div>
                </div>
              )}

              {validationData && (
                <div className="flex justify-end">
                  <button
                    onClick={clearValidation}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Validation Results */}
            {validationData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-card p-6"
              >
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
                  Validation Results
                </h3>

                {/* Summary */}
                {validationData.validationSummary && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Validation Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {Object.entries(validationData.validationSummary).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="font-semibold text-gray-900">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Results */}
                {validationData.detailedResults && (
                  <div className="space-y-6">
                    {Object.entries(validationData.detailedResults).map(([key, result]) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-800 mb-3 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h5>
                        
                        {result.results && (
                          <div className="space-y-2">
                            {Object.entries(result.results).map(([testKey, testResult]) => (
                              <div key={testKey} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span className="text-gray-700">{testResult.message}</span>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  testResult.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {testResult.passed ? 'Passed' : 'Failed'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {result.scenarios && (
                          <div className="space-y-2">
                            {result.scenarios.map((scenario, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                  <div className="font-medium text-gray-800">{scenario.scenario}</div>
                                  <div className="text-sm text-gray-600">{scenario.message}</div>
                                </div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  scenario.errorHandled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {scenario.errorHandled ? 'Handled' : 'Not Handled'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {result.navigationTests && (
                          <div className="space-y-2">
                            {result.navigationTests.map((test, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                  <div className="font-medium text-gray-800">{test.flow}</div>
                                  <div className="text-sm text-gray-600">{test.description}</div>
                                </div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  test.working ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {test.working ? 'Working' : 'Failed'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {result.fieldValidations && (
                          <div className="space-y-2">
                            {Object.entries(result.fieldValidations).map(([fieldKey, fieldResult]) => (
                              <div key={fieldKey} className="p-3 bg-gray-50 rounded">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-gray-800 capitalize">{fieldKey}</span>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    fieldResult.allFieldsPresent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {fieldResult.allFieldsPresent ? 'Valid' : 'Invalid'}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                  Required fields: {fieldResult.requiredFields.join(', ')}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {result.summary && (
                          <div className="mt-3 p-3 bg-blue-50 rounded text-blue-800 text-sm font-medium">
                            {result.summary}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Single Result Display */}
                {!validationData.detailedResults && (validationData.results || validationData.scenarios || validationData.navigationTests || validationData.fieldValidations) && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    {validationData.results && (
                      <div className="space-y-2 mb-4">
                        {Object.entries(validationData.results).map(([testKey, testResult]) => (
                          <div key={testKey} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <span className="text-gray-700">{testResult.message}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              testResult.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {testResult.passed ? 'Passed' : 'Failed'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {validationData.summary && (
                      <div className="p-3 bg-blue-50 rounded text-blue-800 text-sm font-medium">
                        {validationData.summary}
                      </div>
                    )}
                  </div>
                )}

                {validationData.timestamp && (
                  <div className="mt-4 text-xs text-gray-500 text-right">
                    Generated: {new Date(validationData.timestamp).toLocaleString()}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default GuidePage;