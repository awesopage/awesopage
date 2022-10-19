import { expect, test } from 'tests/common/TestRunner'

test('Example test', async ({ page }) => {
  await page.goto('http://localhost:4800')

  await page.click('button[aria-label="User menu"]')

  await page.click('a:has-text("Sign in")')

  await page.fill('input[type="password"]', 'awesome')

  await page.click('button:has-text("Sign in")')

  await page.click('button[aria-label="User menu"]')

  await expect(page.getByText('Admin 1')).toBeVisible()
})
