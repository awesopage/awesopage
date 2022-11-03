import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'packages/pkg-testing/src',
  maxFailures: 10,
  use: {
    baseURL: 'http://localhost:4800',
    screenshot: 'only-on-failure',
  },
  // Based on https://github.com/anishkny/playwright-test-coverage
  // and https://github.com/bahmutov/next-and-cypress-example
  globalSetup: require.resolve('./packages/pkg-testing/global-setup'),
  globalTeardown: require.resolve('./packages/pkg-testing/global-teardown'),
  outputDir: 'test-output/build/playwright',
  reportSlowTests: {
    max: 0,
    threshold: 60_000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'test-output/playwright' }],
    ['junit', { outputFile: 'test-output/junit.xml' }],
  ],
}

export default config
