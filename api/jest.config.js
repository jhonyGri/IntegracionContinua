module.exports = {
    collectCoverage: true,
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    collectCoverageFrom: [
      '*.{js,jsx,ts,tsx}',
      '**/*.{js,jsx,ts,tsx}', 
      '!**/node_modules/**',
      '!**/coverage/**'
    ],
};
  