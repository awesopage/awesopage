import { expect, test } from 'pkg-testing/src/common/TestUtils'

test('Signed-in user can see their name in user menu', async ({ page }) => {
  await page.goto('/auth/__dev/dev-signin')

  await page.fill('#emailId', 'admin1')
  await page.fill('#password', 'awesome')

  await page.click('button:has-text("Sign in")')

  await page.waitForNavigation({ waitUntil: 'networkidle' })

  await page.click('button[aria-label="User menu"]')

  await expect(page.getByText('Admin 1')).toBeVisible()
})
