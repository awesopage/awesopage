import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  timeout: 60_000,
  maxFailures: 10,
  // Based on https://github.com/anishkny/playwright-test-coverage
  // and https://github.com/bahmutov/next-and-cypress-example
  globalSetup: require.resolve('./tests/global-setup'),
  globalTeardown: require.resolve('./tests/global-teardown'),
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'tests-report/playwright' }],
    ['junit', { outputFile: 'tests-report/junit.xml' }],
  ],
}

export default config
