import { AuthMeDTO } from 'pkg-app-shared/src/auth/AuthMeDTO'
import { expect, test } from 'pkg-testing/src/common/TestUtils'

test('Sign in', async ({ page }) => {
  await page.goto('/auth/__dev/dev-signin')

  await page.fill('#emailId', 'admin1')
  await page.fill('#password', 'awesome')

  await page.click('button:has-text("Sign in")')

  await page.waitForNavigation({ waitUntil: 'networkidle' })

  const getAuthMe = await page.context().request.get('/api/auth/me')

  const authMe = (await getAuthMe.json()) as AuthMeDTO

  expect(authMe.user).toMatchObject({
    email: 'admin1@example.com',
    displayName: 'Admin 1',
  })
})

test('Sign out', async ({ page }) => {
  await page.goto('/auth/__dev/dev-signin')

  await page.fill('#emailId', 'admin1')
  await page.fill('#password', 'awesome')

  await page.click('button:has-text("Sign in")')

  await page.waitForNavigation({ waitUntil: 'networkidle' })

  await page.click('button[aria-label="User menu"]')

  await page.click('button:has-text("Sign out")')

  await page.waitForSelector('a:has-text("Sign in")')

  const getAuthMe = await page.context().request.get('/api/auth/me')

  const authMe = (await getAuthMe.json()) as AuthMeDTO

  expect(authMe.user).toBeUndefined()
})

test('View current user', async ({ page }) => {
  await page.goto('/auth/__dev/dev-signin')

  await page.fill('#emailId', 'admin1')
  await page.fill('#password', 'awesome')

  await page.click('button:has-text("Sign in")')

  await page.waitForNavigation({ waitUntil: 'networkidle' })

  await page.click('button[aria-label="User menu"]')

  await expect(page.getByText('Admin 1')).toBeVisible()
})
