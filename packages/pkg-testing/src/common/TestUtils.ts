import { expect as baseExpect, test as baseTest } from 'playwright-test-coverage'

export const expect = baseExpect

//  Based on https://github.com/microsoft/playwright/issues/11134#issuecomment-1044707761
export const test = baseTest.extend<{ _autoSnapshotSuffix: void }>({
  _autoSnapshotSuffix: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use, testInfo) => {
      testInfo.snapshotSuffix = ''

      await use()
    },
    { auto: true },
  ],
})
