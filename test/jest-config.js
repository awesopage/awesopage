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
  globalSetup: '<rootDir>/test/jest-setup.js',
  setupFiles: ['jest-date-mock'],
  setupFilesAfterEnv: ['jest-extended/all', '<rootDir>/scripts/lib/dotenv-loader.js'],
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
  collectCoverageFrom: ['packages/pkg-*/src/**/*.ts', '!packages/pkg-lib-ui/**/*', '!**/__t/**/*'],
}
