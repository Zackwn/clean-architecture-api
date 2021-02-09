const { resolve } = require('path');
const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ["<rootDir>/src/jest-setup.ts"]
};