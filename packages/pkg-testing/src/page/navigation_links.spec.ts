import { expect, test } from 'pkg-testing/src/common/TestUtils'

test('Navigation bar should contain home link', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('nav >> a[href="/"]')).toBeVisible()
})

test('Navigation bar should contain links of main pages', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('nav >> a[href="/lists"]')).toBeVisible()
  await expect(page.locator('nav >> a[href="/resources"]')).toBeVisible()
})

test('Navigation bar should contain GitHub link', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('nav >> a[href="https://github.com/awesopage/awesopage"]')).toBeVisible()
})
