import { expect, test } from 'pkg-testing/src/common/TestUtils'

test('User can click on logo to go to home page', async ({ page }) => {
  await page.goto('/lists')

  await page.click('a[data-test-id="logo"]')

  await expect(page).toHaveURL('/')
})
