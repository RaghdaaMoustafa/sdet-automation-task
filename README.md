# SDET Automation Task

This project is a comprehensive automation framework for both API and UI testing, designed for SDET (Software Development Engineer in Test) tasks. It uses JavaScript, Jest, and Nightwatch.js to automate and validate various scenarios for web applications and APIs.

## Project Structure

```
.
├── api-tests/
│   ├── jest.config.js
│   └── tests/
│       ├── authenticate_user.test.js
│       ├── create_user.test.js
│       ├── delete_user.test.js
│       ├── read_user.test.js
│       └── update_user.test.js
├── nightwatch.conf.js
├── package.json
├── results-reports/
│   ├── minimal_report.json
│   └── ...
├── screens/
│   └── ...
├── ui-tests/
│   ├── data-files/
│   ├── page-objects/
│   ├── qa-reports/
│   └── tests/
│       └── ...
```

## Key Folders & Files

- **api-tests/**: Contains API test suites using Jest and a custom API client.
- **ui-tests/**: Contains UI automation tests, page objects, and test data for Nightwatch.js.
- **results-reports/**: Stores test execution reports and logs.
- **screens/**: Stores screenshots from failed UI tests.
- **nightwatch.conf.js**: Nightwatch.js configuration file for UI automation.
- **package.json**: Project dependencies and scripts.

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
Run from the root directory:
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
or run:
```sh
npx nightwatch --env chrome
```

### Test Reports
- API test results are output in the console and can be configured for JUnit/JSON reports.
- UI test reports and screenshots are saved in the `results-reports/` and `screens/` directories.

## Customization
- Add new API tests in `api-tests/tests/`.
- Add new UI tests in `ui-tests/tests/` and page objects in `ui-tests/page-objects/`.
- Test data can be managed in `ui-tests/data-files/`.

## Troubleshooting
- Ensure all dependencies are installed with `npm install`.
- For UI tests, make sure the Chrome browser is installed and up to date.
- If you encounter issues with Jest globals (e.g., `beforeAll`), ensure you are running tests with Jest and not Node.js directly.

## License
This project is for educational and demonstration purposes.
