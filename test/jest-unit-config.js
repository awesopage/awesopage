const path = require('path')

module.exports = {
  testTimeout: 10_000,
  rootDir: path.join(__dirname, '..'),
  roots: ['<rootDir>/packages'],
  resetMocks: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFiles: ['jest-date-mock'],
  setupFilesAfterEnv: ['jest-extended/all'],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: 'test-report/coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-report',
        suiteName: 'Test report',
      },
    ],
    [
      'jest-stare',
      {
        resultDir: 'test-report',
        reportTitle: 'Test report',
        coverageLink: './coverage/lcov-report/index.html',
      },
    ],
  ],
  coverageReporters: ['lcov', ['text', { skipFull: true }], 'text-summary'],
  collectCoverageFrom: ['packages/ap-*/src/**/*.ts', '!**/__t/**/*'],
}
