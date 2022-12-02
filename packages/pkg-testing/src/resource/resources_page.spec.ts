import { expect, test } from 'pkg-testing/src/common/TestUtils'

test('Resource card should match snapshot', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 600 })

  await page.goto('/resources')

  expect(
    await page.locator('[data-test-id="resource-card/https://github.com/vercel/next.js"]').screenshot(),
  ).toMatchSnapshot('resource-card.png')
})
