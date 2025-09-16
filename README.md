
# SDET Automation Task

[![CircleCI](https://circleci.com/gh/RaghdaaMoustafa/sdet-automation-task.svg?style=svg)](https://circleci.com/gh/raghdaa/sdet-automation-task)

This project is a comprehensive automation framework for both API and UI testing, designed for SDET (Software Development Engineer in Test) tasks. It uses JavaScript, Jest, and Nightwatch.js to automate and validate various scenarios for web applications and APIs.

## Project Structure

```
sdet-automation-task/
├── .circleci/
├── .git/
├── .gitignore
├── api-tests/
│   ├── bug-reports/
│   ├── jest.config.js
│   ├── results-reports/
│   ├── tests/
│   │   ├── authenticate_user.test.js
│   │   ├── create_user.test.js
│   │   ├── delete_user.test.js
│   │   ├── read_user.test.js
│   │   └── update_user.test.js
│   └── utils/
├── nightwatch.conf.js
├── node_modules/
├── package-lock.json
├── package.json
├── README.md
└── ui-tests/
    ├── data-files/
    │   ├── linkedinRegistrationData.json
    │   └── myStoreData.json
    ├── page-objects/
    │   ├── linkedinRegistrationPage.js
    │   └── myStorePage.js
    ├── qa-reports/
    │   ├── myStore/
    │   │   └── bug_tickets.pdf
    │   └── sampleSite/
    │       ├── bug_tickets.pdf
    │       └── test_cases.pdf
    ├── results-reports/
    │   ├── linkedinRegistration/
    │   │   ├── CHROME_140.0.7339.128__linkedinRegistrationTest.json
    │   │   └── CHROME_140.0.7339.128__linkedinRegistrationTest.xml
    │   ├── minimal_report.json
    │   ├── myStore/
    │   │   ├── CHROME_140.0.7339.128__searchTest.json
    │   │   └── CHROME_140.0.7339.128__searchTest.xml
    │   ├── nightwatch-html-report/
    │   │   └── index.html
    │   └── sampleSite/
    │       ├── CHROME_140.0.7339.128__navigationTest.json
    │       └── CHROME_140.0.7339.128__navigationTest.xml
    └── tests/
        ├── linkedinRegistration/
        │   └── linkedinRegistrationTest.js
        ├── myStore/
        │   └── searchTest.js
        └── sampleSite/
            └── navigationTest.js
```


## Key Folders & Files

- **api-tests/**: API test suites using Jest and a custom API client.
- **api-tests/bug-reports/**: Contains bug tickets as Word documents for API tests.
- **api-tests/results-reports/**: Stores API test execution reports and logs.
- **ui-tests/**: UI automation tests, page objects, and test data for Nightwatch.js.
- **ui-tests/qa-reports/**: Contains bug tickets and test cases as PDF files for UI tests.
- **ui-tests/results-reports/**: Stores UI test execution reports and logs, including Nightwatch HTML reports.
- **nightwatch.conf.js**: Nightwatch.js configuration file for UI automation.
- **package.json**: Project dependencies and scripts.


## CI/CD

This project uses [CircleCI](https://circleci.com/) for continuous integration and automated testing. The status badge at the top of this README reflects the current build status.

**Note:** The CI/CD pipeline is currently failing because there are known bugs in the project. These are documented in the bug reports folders (`api-tests/bug-reports/` for API and `ui-tests/qa-reports/` for UI). Resolving these bugs will allow the pipeline to pass successfully.

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- Chrome browser (for UI tests)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd sdet-automation-task
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running API Tests
From the root directory:
```sh
npm test
```

### Running UI Tests
If you have a script for Nightwatch in your `package.json`, use:
```sh
npm run nightwatch
```
Or, if you use a custom script name, replace `nightwatch` with your script name. If you do not have a script, you can add one like this:
```json
"scripts": {
  "test": "jest --config ./api-tests/jest.config.js --runInBand",
  "dev": "nodemon ./node_modules/mock-user-auth/bin/www.js",
  "nightwatch": "nightwatch --env chrome"
}
```
Or run directly:
```sh
npx nightwatch --env chrome
```

### Test Reports
- API test results are output in the console and can be configured for JUnit/JSON reports in `api-tests/results-reports/`.
- Nightwatch HTML reports are saved in `ui-tests/results-reports/nightwatch-html-report/index.html`.

## Customization
- Add new API tests in `api-tests/tests/`.
- Add new UI tests in `ui-tests/tests/` and page objects in `ui-tests/page-objects/`.
- Test data can be managed in `ui-tests/data-files/`.

## Troubleshooting
- Ensure all dependencies are installed with `npm install`.
- For UI tests, make sure the Chrome browser is installed and up to date.

