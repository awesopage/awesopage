import { expect, test } from 'pkg-testing/src/common/TestUtils'

test('Signed-in user can see their name in user menu', async ({ page }) => {
  await page.goto('/auth/__dev/dev-signin')

  await page.locator('#emailId').fill('admin1')
  await page.locator('#password').fill('awesome')

  await page.getByText('Sign in').click()

  await page.waitForNavigation({ waitUntil: 'networkidle' })

  await page.locator('button[aria-label="User menu"]').click()

  await expect(page.getByText('Admin 1')).toBeVisible()
})
