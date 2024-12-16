export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JS/JSX files using Babel
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Add jest-dom matchers
  testEnvironment: 'jsdom', // Use jsdom for browser-like environment
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js', // If you have a jest.setup.js file
    '@testing-library/jest-dom/extend-expect', // Add this line
  ],
}
