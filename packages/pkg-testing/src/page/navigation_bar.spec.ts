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

test('Navigation bar screenshot should match snapshot', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 600 })

  await page.goto('/')

  await page.waitForSelector('[data-test-id="ready-user-menu"]')

  expect(await page.locator('nav').screenshot()).toMatchSnapshot('navigation_bar.png')
})
