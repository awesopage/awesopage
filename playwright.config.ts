import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'packages/pkg-testing/src',
  snapshotPathTemplate: 'packages/pkg-testing/snapshot/{testFilePath}/{arg}{ext}',
  fullyParallel: true,
  maxFailures: 10,
  workers: process.env.CI ? 2 : 4,
  use: {
    baseURL: 'http://localhost:4800',
    screenshot: 'only-on-failure',
  },
  expect: {
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.05,
    },
  },
  // Based on https://github.com/anishkny/playwright-test-coverage
  // and https://github.com/bahmutov/next-and-cypress-example
  globalSetup: 'scripts/test-setup.ts',
  globalTeardown: 'scripts/test-teardown.ts',
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
