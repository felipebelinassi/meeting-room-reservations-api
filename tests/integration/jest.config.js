const testConfig = require('../../jest.config');

module.exports = {
  ...testConfig,
  displayName: 'integration-tests',
  testMatch: ['**/tests/integration/**/(*.)+(spec|test).+(ts|tsx|js)'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  collectCoverage: false,
};
