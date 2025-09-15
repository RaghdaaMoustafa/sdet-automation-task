module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/api-tests/tests/**/*.test.js'],  // Match only .test.js files in ./api-tests/tests/
    reporters: [
        'default',
        ['jest-html-reporter', {
            pageTitle: 'API Test Report',
            outputPath: './api-tests/results-reports/mock-user-auth_test_report.html',
            "includeFailureMsg": true    
        }],
    ],
};