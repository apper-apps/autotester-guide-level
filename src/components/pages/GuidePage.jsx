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
import { executeTests, generateBugReport, generateExecutableTestSteps, generateTestCases, getPrerequisites, getProTips, getSteps, validateErrorHandling, validateFieldRequirements, validateNavigationFlows, validateSuccessMessages } from "@/services/api/guideService";

const GuidePage = () => {
  const [prerequisites, setPrerequisites] = useState([]);
  const [steps, setSteps] = useState([]);
  const [proTips, setProTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationData, setValidationData] = useState(null);
  const [validationLoading, setValidationLoading] = useState(false);
const [validationError, setValidationError] = useState("");
  const [testStepsData, setTestStepsData] = useState(null);
  const [testStepsLoading, setTestStepsLoading] = useState(false);
const [testStepsError, setTestStepsError] = useState("");
  const [testExecutionData, setTestExecutionData] = useState(null);
  const [testExecutionLoading, setTestExecutionLoading] = useState(false);
  const [testExecutionError, setTestExecutionError] = useState("");
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

  const generateTestSteps = async (options = {}) => {
    try {
      setTestStepsLoading(true);
      setTestStepsError("");
      
      const result = await generateExecutableTestSteps(options);
      setTestStepsData(result);
    } catch (err) {
      setTestStepsError("Failed to generate test steps. Please try again.");
      console.error("Error generating test steps:", err);
    } finally {
      setTestStepsLoading(false);
    }
  };

  const clearTestSteps = () => {
    setTestStepsData(null);
    setTestStepsError("");
};

  const executeTestSuite = async (options = {}) => {
    try {
      setTestExecutionLoading(true);
      setTestExecutionError("");
      
      const result = await executeTests(options);
      setTestExecutionData(result);
    } catch (err) {
      setTestExecutionError("Failed to execute tests. Please try again.");
      console.error("Error executing tests:", err);
    } finally {
      setTestExecutionLoading(false);
    }
  };

  const clearTestExecution = () => {
    setTestExecutionData(null);
    setTestExecutionError("");
  };

  const downloadTestResults = () => {
    if (!testExecutionData) return;
    
    const dataStr = JSON.stringify(testExecutionData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `test-results-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const generateBugReportData = async () => {
    if (!testExecutionData) return;
    
    try {
      const bugReport = await generateBugReport(testExecutionData);
      const dataStr = JSON.stringify(bugReport, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `bug-report-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (err) {
      console.error("Error generating bug report:", err);
    }
  };

  const downloadTestSteps = () => {
    if (!testStepsData) return;
    
    const dataStr = JSON.stringify(testStepsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `test-steps-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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

      {/* Step 3: AI Creates Executable Test Steps */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-16 bg-gradient-to-br from-green-50 to-emerald-100"
      >
        <div className="container mx-auto px-4">
<div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Step 3: AI Creates Executable Test Steps
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              AI processes your validated flow and generates optimized test steps with minimal actions, 
              proper element locators and interactions, smartly adding success/failure assertions with specific messages, 
              and complete test workflows from start to finish. Review and refine — customize test steps if needed. 
              Your test suite is ready — no coding required!
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Test Generation Controls */}
            <div className="bg-white rounded-xl shadow-card p-6 mb-8">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
                Generate Test Steps
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => generateTestSteps({ optimization: 'minimal' })}
                  disabled={testStepsLoading}
                  className="flex items-center justify-center px-4 py-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="Minimize2" size={20} className="mr-2" />
                  Minimal Actions
                </button>
                
                <button
                  onClick={() => generateTestSteps({ optimization: 'comprehensive' })}
                  disabled={testStepsLoading}
                  className="flex items-center justify-center px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="List" size={20} className="mr-2" />
                  Comprehensive
                </button>
                
                <button
                  onClick={() => generateTestSteps({ optimization: 'smart' })}
                  disabled={testStepsLoading}
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="Zap" size={20} className="mr-2" />
                  Smart Generation
                </button>
              </div>

              {testStepsLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-gray-600">Generating test steps...</span>
                </div>
              )}

              {testStepsError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <ApperIcon name="AlertTriangle" size={20} className="text-red-600 mr-2" />
                    <span className="text-red-800">{testStepsError}</span>
                  </div>
                </div>
              )}

              {testStepsData && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={downloadTestSteps}
                      className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Download" size={16} className="mr-2" />
                      Export Test Steps
                    </button>
                    <span className="text-sm text-gray-600">
                      {testStepsData.testSteps?.length || 0} test steps generated
                    </span>
                  </div>
                  <button
                    onClick={clearTestSteps}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Test Steps Results */}
            {testStepsData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-card p-6"
              >
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
                  Generated Test Steps
                </h3>

                {/* Summary */}
                {testStepsData.summary && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Test Suite Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm text-green-600 mb-1">Total Steps</div>
                        <div className="font-semibold text-green-900">{testStepsData.summary.totalSteps}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-sm text-blue-600 mb-1">Assertions</div>
                        <div className="font-semibold text-blue-900">{testStepsData.summary.assertions}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-sm text-purple-600 mb-1">Element Locators</div>
                        <div className="font-semibold text-purple-900">{testStepsData.summary.locators}</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-sm text-orange-600 mb-1">Test Workflows</div>
                        <div className="font-semibold text-orange-900">{testStepsData.summary.workflows}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Test Steps */}
                {testStepsData.testSteps && testStepsData.testSteps.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Test Steps</h4>
                    <div className="space-y-4">
                      {testStepsData.testSteps.map((step, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                {index + 1}
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-800">{step.action}</h5>
                                <p className="text-sm text-gray-600">{step.description}</p>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              step.type === 'action' ? 'bg-blue-100 text-blue-800' : 
                              step.type === 'assertion' ? 'bg-green-100 text-green-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {step.type}
                            </span>
                          </div>
                          
                          {step.elementLocator && (
                            <div className="mb-3">
                              <div className="text-sm font-medium text-gray-700 mb-1">Element Locator</div>
                              <div className="bg-gray-50 rounded p-2 text-sm font-mono text-gray-800">
                                {step.elementLocator}
                              </div>
                            </div>
                          )}
                          
                          {step.expectedResult && (
                            <div className="mb-3">
                              <div className="text-sm font-medium text-gray-700 mb-1">Expected Result</div>
                              <div className="text-sm text-gray-600">{step.expectedResult}</div>
                            </div>
                          )}
                          
                          {step.assertions && step.assertions.length > 0 && (
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-1">Assertions</div>
                              <div className="space-y-1">
                                {step.assertions.map((assertion, assertIndex) => (
                                  <div key={assertIndex} className="flex items-center text-sm">
                                    <ApperIcon name="CheckCircle" size={14} className="text-green-600 mr-2" />
                                    <span className="text-gray-700">{assertion}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Test Workflows */}
                {testStepsData.workflows && testStepsData.workflows.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Complete Test Workflows</h4>
                    <div className="space-y-4">
                      {testStepsData.workflows.map((workflow, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-semibold text-gray-800">{workflow.name}</h5>
                            <span className="text-sm text-gray-600">{workflow.steps.length} steps</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {workflow.steps.map((stepRef, stepIndex) => (
                              <span key={stepIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Step {stepRef}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generation Options */}
                {testStepsData.optimization && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <ApperIcon name="Settings" size={16} className="text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">Generation Options</span>
                    </div>
                    <div className="text-sm text-blue-700">
                      Optimization: {testStepsData.optimization} | 
                      Smart assertions: {testStepsData.smartAssertions ? 'Enabled' : 'Disabled'} | 
                      Element detection: {testStepsData.elementDetection || 'Auto'}
                    </div>
                  </div>
                )}

                {testStepsData.timestamp && (
                  <div className="mt-4 text-xs text-gray-500 text-right">
                    Generated: {new Date(testStepsData.timestamp).toLocaleString()}
                  </div>
                )}
              </motion.div>
            )}
          </div>
</div>
      </motion.section>

{/* Step 4: Run Tests & Catch Bugs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="py-16 bg-gradient-to-br from-purple-50 to-pink-100"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Step 4: Run Tests & Catch Bugs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Execute your test suite with one click. Get detailed results showing what passed and what failed, 
              screenshots of any issues, specific error messages and assertions. Fix bugs before users find them.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Test Execution Controls */}
            <div className="bg-white rounded-xl shadow-card p-6 mb-8">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
                Execute Your Test Suite
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => executeTestSuite({ mode: 'quick' })}
                  disabled={testExecutionLoading}
                  className="flex items-center justify-center px-6 py-4 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="Play" size={20} className="mr-2" />
                  Quick Run
                </button>
                
                <button
                  onClick={() => executeTestSuite({ mode: 'comprehensive' })}
                  disabled={testExecutionLoading}
                  className="flex items-center justify-center px-6 py-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="PlayCircle" size={20} className="mr-2" />
                  Full Suite
                </button>
                
                <button
                  onClick={() => executeTestSuite({ mode: 'smart', includeScreenshots: true })}
                  disabled={testExecutionLoading}
                  className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="Zap" size={20} className="mr-2" />
                  One-Click Execute
                </button>
              </div>

              {testExecutionLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-gray-600">Running tests...</span>
                </div>
              )}

              {testExecutionError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <ApperIcon name="AlertTriangle" size={20} className="text-red-600 mr-2" />
                    <span className="text-red-800">{testExecutionError}</span>
                  </div>
                </div>
              )}

              {testExecutionData && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={downloadTestResults}
                      className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Download" size={16} className="mr-2" />
                      Export Results
                    </button>
                    <button
                      onClick={generateBugReportData}
                      className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Bug" size={16} className="mr-2" />
                      Bug Report
                    </button>
                  </div>
                  <button
                    onClick={clearTestExecution}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Test Results */}
            {testExecutionData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-card p-6"
              >
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
                  Test Results
                </h3>

                {/* Quick Summary */}
                {testExecutionData.summary && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-900">{testExecutionData.summary.passed}</div>
                      <div className="text-sm text-green-600">Passed</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-900">{testExecutionData.summary.failed}</div>
                      <div className="text-sm text-red-600">Failed</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-900">{testExecutionData.summary.totalTests}</div>
                      <div className="text-sm text-blue-600">Total</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-900">{testExecutionData.summary.successRate}%</div>
                      <div className="text-sm text-purple-600">Success Rate</div>
                    </div>
                  </div>
                )}

                {/* Test Results List */}
                {testExecutionData.testResults && testExecutionData.testResults.length > 0 && (
                  <div className="space-y-3">
                    {testExecutionData.testResults.map((result, index) => (
                      <div key={index} className={`border rounded-lg p-4 ${
                        result.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                              result.passed ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {result.passed ? 
                                <ApperIcon name="Check" size={14} className="text-green-600" /> : 
                                <ApperIcon name="X" size={14} className="text-red-600" />
                              }
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-800">{result.testName}</h5>
                              <p className="text-sm text-gray-600">{result.description}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {result.passed ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        
                        {result.screenshot && (
                          <div className="mt-3 flex items-center text-sm text-gray-600">
                            <ApperIcon name="Camera" size={16} className="mr-2" />
                            Screenshot: {result.screenshot}
                          </div>
                        )}
                        
                        {result.errorMessage && (
                          <div className="mt-3">
                            <div className="text-sm font-medium text-red-700 mb-1">Error:</div>
                            <div className="bg-red-100 rounded p-2 text-sm text-red-800 font-mono">
                              {result.errorMessage}
                            </div>
                          </div>
                        )}
                        
                        {result.assertions && result.assertions.length > 0 && (
                          <div className="mt-3">
                            <div className="text-sm font-medium text-gray-700 mb-1">Assertions:</div>
                            <div className="space-y-1">
                              {result.assertions.map((assertion, assertIndex) => (
                                <div key={assertIndex} className="flex items-center text-sm">
                                  <ApperIcon 
                                    name={assertion.passed ? "CheckCircle" : "XCircle"} 
                                    size={12} 
                                    className={`mr-2 ${assertion.passed ? 'text-green-600' : 'text-red-600'}`} 
                                  />
                                  <span className="text-gray-700">{assertion.message}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Bugs Found */}
                {testExecutionData.bugs && testExecutionData.bugs.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <ApperIcon name="Bug" size={20} className="text-red-600 mr-2" />
                      Bugs Found ({testExecutionData.bugs.length})
                    </h4>
                    <div className="space-y-3">
                      {testExecutionData.bugs.map((bug, index) => (
                        <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-red-800">{bug.title}</h5>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              bug.severity === 'high' ? 'bg-red-100 text-red-800' : 
                              bug.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {bug.severity}
                            </span>
                          </div>
                          <p className="text-sm text-red-600 mb-2">{bug.description}</p>
                          {bug.suggestion && (
                            <p className="text-sm text-red-700 font-medium">Fix: {bug.suggestion}</p>
                          )}
                        </div>
                      ))}
                    </div>
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