import React from "react";
import prerequisitesData from "@/services/mockData/prerequisites.json";
import stepsData from "@/services/mockData/steps.json";
import proTipsData from "@/services/mockData/proTips.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getPrerequisites = async () => {
  await delay(300);
  
  // Sanitize prerequisites data
  const sanitizedPrerequisites = prerequisitesData.filter(item => 
    item && (item.title || item.description)
  );
  
  return sanitizedPrerequisites;
};

export const getSteps = async () => {
  await delay(350);
  
  // Sanitize steps data to ensure subSteps arrays are valid
  const sanitizedSteps = stepsData.map(step => {
    if (!step) return null;
    
    return {
      ...step,
      subSteps: Array.isArray(step.subSteps) 
        ? step.subSteps.filter(subStep => 
            subStep != null && 
            subStep !== '' && 
            (typeof subStep === 'string' || (subStep.title || subStep.description))
          )
        : []
    };
  }).filter(step => step != null);
  
  return sanitizedSteps;
};

export const getProTips = async () => {
  await delay(400);
  
  // Sanitize pro tips data
  const sanitizedProTips = proTipsData.filter(item => 
    item && (item.title || item.description)
  );
  
  return sanitizedProTips;
};

export const getPrerequisiteById = async (id) => {
  await delay(200);
  return prerequisitesData.find(item => item.Id === parseInt(id));
};

export const getStepById = async (id) => {
  await delay(200);
  return stepsData.find(item => item.Id === parseInt(id));
};

export const getProTipById = async (id) => {
  await delay(200);
  return proTipsData.find(item => item.Id === parseInt(id));
};

// Step 2: Validation Flow & Test Case Generation
export const validateSuccessMessages = async () => {
  await delay(300);
  
  const validationResults = {
    prerequisitesSuccess: {
      tested: true,
      passed: prerequisitesData.length > 0,
      message: "Prerequisites loaded successfully"
    },
    stepsSuccess: {
      tested: true,
      passed: stepsData.length > 0,
      message: "Steps loaded and displayed correctly"
    },
    proTipsSuccess: {
      tested: true,
      passed: proTipsData.length > 0,
      message: "Pro tips rendered with proper formatting"
    }
  };
  
  return {
    status: "success",
    results: validationResults,
    summary: `${Object.values(validationResults).filter(r => r.passed).length}/3 success validations passed`
  };
};

export const validateErrorHandling = async () => {
  await delay(400);
  
  const errorScenarios = [
    {
      scenario: "Network failure simulation",
      tested: true,
      errorHandled: true,
      recoveryAvailable: true,
      message: "Error component displays with retry option"
    },
    {
      scenario: "Empty data response",
      tested: true,
      errorHandled: true,
      recoveryAvailable: true,
      message: "Empty state component shows appropriate message"
    },
    {
      scenario: "Invalid data format",
      tested: true,
      errorHandled: true,
      recoveryAvailable: false,
      message: "Data validation prevents rendering issues"
    }
  ];
  
  return {
    status: "validated",
    scenarios: errorScenarios,
    summary: `${errorScenarios.filter(s => s.errorHandled).length}/${errorScenarios.length} error scenarios handled`
  };
};

export const validateFieldRequirements = async () => {
  await delay(250);
  
  const fieldValidations = {
    prerequisites: {
      requiredFields: ["Id", "title", "description"],
      validated: true,
      allFieldsPresent: prerequisitesData.every(item => 
        item.Id && item.title && item.description
      )
    },
    steps: {
      requiredFields: ["Id", "title", "description", "order"],
      validated: true,
      allFieldsPresent: stepsData.every(item => 
        item.Id && item.title && item.description && item.order
      )
    },
    proTips: {
      requiredFields: ["Id", "title", "description", "category"],
      validated: true,
      allFieldsPresent: proTipsData.every(item => 
        item.Id && item.title && item.description && item.category
      )
    }
  };
  
  return {
    status: "validated",
    fieldValidations,
    summary: `${Object.values(fieldValidations).filter(f => f.allFieldsPresent).length}/3 field requirement validations passed`
  };
};

export const validateNavigationFlows = async () => {
  await delay(350);
  
  const navigationTests = [
    {
      flow: "Home to Guide",
      tested: true,
      working: true,
      description: "User can navigate to guide from home page"
    },
    {
      flow: "Section scrolling",
      tested: true,
      working: true,
      description: "Smooth scroll between prerequisites, steps, and tips"
    },
    {
      flow: "Error recovery",
      tested: true,
      working: true,
      description: "Retry button returns to main content"
    },
    {
      flow: "Loading states",
      tested: true,
      working: true,
      description: "Loading indicators during data fetch"
    }
  ];
  
  return {
    status: "validated",
    navigationTests,
    summary: `${navigationTests.filter(t => t.working).length}/${navigationTests.length} navigation flows working correctly`
  };
};

export const generateTestCases = async () => {
  await delay(500);
  
  const [successValidation, errorValidation, fieldValidation, navigationValidation] = await Promise.all([
    validateSuccessMessages(),
    validateErrorHandling(),
    validateFieldRequirements(),
    validateNavigationFlows()
  ]);
  
  const testCases = {
    validationSummary: {
      successMessages: successValidation.summary,
      errorHandling: errorValidation.summary,
      fieldRequirements: fieldValidation.summary,
      navigationFlows: navigationValidation.summary
    },
    detailedResults: {
      successValidation,
      errorValidation,
      fieldValidation,
      navigationValidation
    },
    overallStatus: "validation_complete",
timestamp: new Date().toISOString()
  };
  
  return testCases;
};

// Step 3: AI Creates Executable Test Steps
export const generateExecutableTestSteps = async (options = {}) => {
  await delay(500);
  
  const { optimization = 'smart' } = options;
  
  // Generate optimized test steps based on validation results
  const testSteps = [
    {
      id: 1,
      action: "Navigate to Application",
      description: "Open the application URL and verify page loads correctly",
      type: "action",
      elementLocator: "body",
      expectedResult: "Application homepage is displayed",
      assertions: [
        "Page title contains 'AutoTester'",
        "Main navigation is visible",
        "Page loads within 3 seconds"
      ]
    },
    {
      id: 2,
      action: "Verify Prerequisites Section",
      description: "Check that all prerequisites are displayed with proper formatting",
      type: "assertion",
      elementLocator: "[data-testid='prerequisites-section']",
      expectedResult: "Prerequisites section shows all required items",
      assertions: [
        "Prerequisites section is visible",
        "All prerequisite items have titles and descriptions",
        "Section heading is properly formatted"
      ]
    },
    {
      id: 3,
      action: "Navigate Through Steps",
      description: "Verify each step in the guide can be accessed and displays correctly",
      type: "action",
      elementLocator: "[data-testid='steps-list']",
      expectedResult: "All guide steps are accessible and well-formatted",
      assertions: [
        "Steps are numbered sequentially",
        "Each step has a clear title and description",
        "Sub-steps are properly indented"
      ]
    },
    {
      id: 4,
      action: "Test Validation Controls",
      description: "Interact with validation buttons and verify responses",
      type: "action",
      elementLocator: "[data-testid='validation-controls']",
      expectedResult: "Validation controls work as expected",
      assertions: [
        "Success message validation runs without errors",
        "Error handling validation shows proper results",
        "Field requirements validation completes successfully"
      ]
    },
    {
      id: 5,
      action: "Generate Test Cases",
      description: "Run complete test case generation and verify output",
      type: "action",
      elementLocator: "button:contains('Generate All Tests')",
      expectedResult: "Test cases are generated and displayed",
      assertions: [
        "Test generation completes without errors",
        "Results are displayed in organized sections",
        "Summary statistics are accurate"
      ]
    },
    {
      id: 6,
      action: "Generate Test Steps",
      description: "Create executable test steps and verify output quality",
      type: "action",
      elementLocator: "button:contains('Smart Generation')",
      expectedResult: "Test steps are generated with proper structure",
      assertions: [
        "Test steps have clear actions and descriptions",
        "Element locators are specific and reliable",
        "Assertions are meaningful and testable"
      ]
    },
    {
      id: 7,
      action: "Export Test Results",
      description: "Download generated test steps and verify file format",
      type: "action",
      elementLocator: "button:contains('Export Test Steps')",
      expectedResult: "Test steps are exported in JSON format",
      assertions: [
        "Export button is enabled after generation",
        "Downloaded file contains valid JSON",
        "All test data is preserved in export"
      ]
    },
    {
      id: 8,
      action: "Verify Error Handling",
      description: "Test error scenarios and recovery mechanisms",
      type: "assertion",
      elementLocator: "[data-testid='error-display']",
      expectedResult: "Errors are handled gracefully with recovery options",
      assertions: [
        "Error messages are user-friendly",
        "Retry mechanisms work correctly",
        "Loading states are properly managed"
      ]
    }
  ];

  // Filter steps based on optimization type
  let optimizedSteps = testSteps;
  if (optimization === 'minimal') {
    optimizedSteps = testSteps.filter(step => 
      ['Navigate to Application', 'Generate Test Cases', 'Export Test Results'].includes(step.action)
    );
  } else if (optimization === 'comprehensive') {
    // Add additional detailed steps for comprehensive testing
    optimizedSteps = [
      ...testSteps,
      {
        id: 9,
        action: "Test Responsive Design",
        description: "Verify application works on different screen sizes",
        type: "assertion",
        elementLocator: "body",
        expectedResult: "Application is responsive across devices",
        assertions: [
          "Layout adapts to mobile screens",
          "Navigation remains accessible",
          "Content is readable on all devices"
        ]
      },
      {
        id: 10,
        action: "Verify Accessibility",
        description: "Check accessibility features and compliance",
        type: "assertion",
        elementLocator: "[role='main']",
        expectedResult: "Application meets accessibility standards",
        assertions: [
          "All interactive elements are keyboard accessible",
          "Alt text is provided for images",
          "Color contrast meets WCAG guidelines"
        ]
      }
    ];
  }

  // Generate test workflows
  const workflows = [
    {
      name: "End-to-End User Journey",
      description: "Complete user flow from landing to test generation",
      steps: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      name: "Validation Flow",
      description: "Focus on validation and test case generation",
      steps: [1, 4, 5]
    },
    {
      name: "Error Handling Flow",
      description: "Test error scenarios and recovery",
      steps: [1, 8]
    }
  ];

  // Generate summary statistics
  const summary = {
    totalSteps: optimizedSteps.length,
    assertions: optimizedSteps.reduce((total, step) => total + (step.assertions?.length || 0), 0),
    locators: optimizedSteps.filter(step => step.elementLocator).length,
    workflows: workflows.length
  };

return {
    status: "generated",
    optimization,
    smartAssertions: optimization === 'smart',
    elementDetection: "auto",
    testSteps: optimizedSteps,
    workflows,
    summary,
    timestamp: new Date().toISOString()
  };
};

// Step 4: Run Tests & Catch Bugs
export const executeTests = async (options = {}) => {
  await delay(800);
  
  const { mode = 'smart', includeScreenshots = false } = options;
  
  // Simulate test execution with realistic results
  const testResults = [
    {
      testName: "User Authentication Flow",
      description: "Verify user can log in with valid credentials",
      passed: true,
      executionTime: 1250,
      screenshot: includeScreenshots ? "screenshot-login-success.png" : null,
      assertions: [
        { message: "Login form is displayed", passed: true },
        { message: "Valid credentials are accepted", passed: true },
        { message: "User is redirected to dashboard", passed: true }
      ]
    },
    {
      testName: "Form Validation",
      description: "Check required field validation on registration form",
      passed: false,
      executionTime: 890,
      screenshot: includeScreenshots ? "screenshot-validation-error.png" : null,
      errorMessage: "Element not found: [data-testid='email-error']",
      assertions: [
        { message: "Email field shows error for invalid format", passed: false },
        { message: "Password field shows strength indicator", passed: true },
        { message: "Submit button is disabled for invalid form", passed: true }
      ]
    },
    {
      testName: "Navigation Menu",
      description: "Test main navigation functionality",
      passed: true,
      executionTime: 650,
      screenshot: includeScreenshots ? "screenshot-navigation-menu.png" : null,
      assertions: [
        { message: "All menu items are clickable", passed: true },
        { message: "Active menu item is highlighted", passed: true },
        { message: "Mobile menu works correctly", passed: true }
      ]
    },
    {
      testName: "Data Loading",
      description: "Verify data loads correctly from API",
      passed: false,
      executionTime: 2100,
      screenshot: includeScreenshots ? "screenshot-data-loading-error.png" : null,
      errorMessage: "Network timeout: Request to /api/data took longer than 5000ms",
      assertions: [
        { message: "Loading spinner is displayed", passed: true },
        { message: "Data is fetched within timeout", passed: false },
        { message: "Error state is handled gracefully", passed: true }
      ]
    },
    {
      testName: "Responsive Design",
      description: "Test layout on different screen sizes",
      passed: true,
      executionTime: 1450,
      screenshot: includeScreenshots ? "screenshot-responsive-design.png" : null,
      assertions: [
        { message: "Mobile layout renders correctly", passed: true },
        { message: "Tablet layout is properly formatted", passed: true },
        { message: "Desktop layout uses full width", passed: true }
      ]
    }
  ];

  // Filter results based on mode
  let filteredResults = testResults;
  if (mode === 'quick') {
    filteredResults = testResults.slice(0, 3);
  }

  // Generate summary
  const passed = filteredResults.filter(r => r.passed).length;
  const failed = filteredResults.filter(r => !r.passed).length;
  const totalTests = filteredResults.length;
  const successRate = Math.round((passed / totalTests) * 100);

  // Identify bugs from failed tests
  const bugs = filteredResults
    .filter(r => !r.passed)
    .map(result => ({
      title: `Bug in ${result.testName}`,
      description: result.errorMessage || "Test failed without specific error message",
      severity: result.testName.includes('Authentication') ? 'high' : 'medium',
      location: result.testName.includes('Form') ? 'src/components/forms/RegistrationForm.jsx' : 'src/services/api/dataService.js',
      reproduction: `Execute test: ${result.testName}`,
      suggestion: result.testName.includes('Form') ? 
        'Add proper data-testid attributes to error elements' : 
        'Increase API timeout or add retry logic'
    }));

  return {
    status: "executed",
    summary: {
      passed,
      failed,
      totalTests,
      successRate
    },
    testResults: filteredResults,
    bugs,
    executionDetails: {
      mode,
      environment: "test",
      browser: "Chrome 120.0",
      screenshotsEnabled: includeScreenshots
    },
    timestamp: new Date().toISOString()
  };
};

export const generateBugReport = async (testExecutionData) => {
  await delay(300);
  
  const { bugs, summary, timestamp } = testExecutionData;
  
  const bugReport = {
    reportId: `BR-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    testExecutionId: timestamp,
    summary: {
      totalBugs: bugs.length,
      highPriority: bugs.filter(b => b.severity === 'high').length,
      mediumPriority: bugs.filter(b => b.severity === 'medium').length,
      lowPriority: bugs.filter(b => b.severity === 'low').length
    },
    testSummary: summary,
    detailedBugs: bugs.map((bug, index) => ({
      bugId: `BUG-${Date.now()}-${index + 1}`,
      ...bug,
      status: 'open',
      assignee: null,
      estimatedFixTime: bug.severity === 'high' ? '2 hours' : '1 hour'
    })),
    recommendations: [
      {
        category: 'Testing',
        suggestion: 'Add more comprehensive element selectors to reduce locator failures'
      },
      {
        category: 'Performance',
        suggestion: 'Implement timeout handling for API calls to prevent test failures'
      },
      {
        category: 'UI/UX',
        suggestion: 'Ensure all interactive elements have proper accessibility attributes'
      }
    ],
    nextSteps: [
      'Review and prioritize bugs based on severity',
'Assign bugs to development team',
      'Create tracking tickets in project management system',
      'Schedule bug fixes in next sprint',
      'Re-run tests after fixes are implemented'
    ]
  };
  
  return bugReport;
};