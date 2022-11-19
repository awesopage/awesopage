import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'packages/pkg-testing/src',
  snapshotPathTemplate: 'packages/pkg-testing/snapshot/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  maxFailures: 10,
  use: {
    baseURL: 'http://localhost:4800',
    screenshot: 'only-on-failure',
  },
  expect: {
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  // Based on https://github.com/anishkny/playwright-test-coverage
  // and https://github.com/bahmutov/next-and-cypress-example
  globalSetup: require.resolve('./scripts/test-setup'),
  globalTeardown: require.resolve('./scripts/test-teardown'),
  outputDir: 'build/test/playwright',
  reportSlowTests: {
    max: 0,
    threshold: 60_000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'build/test/reports/playwright' }],
    ['junit', { outputFile: 'build/test/reports/junit.xml' }],
  ],
}

export default config
