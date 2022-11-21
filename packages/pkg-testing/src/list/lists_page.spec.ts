import { expect, test } from 'pkg-testing/src/common/TestUtils'

test('List card should match snapshot', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 600 })

  await page.goto('/lists')

  expect(await page.locator('[data-test-id="list-card/sindresorhus/awesome-nodejs"]').screenshot()).toMatchSnapshot(
    'list-card.png',
  )
})
