import { AuthMeDTO } from 'pkg-app-shared/src/auth/AuthMeDTO'
import { expect, test } from 'pkg-testing/src/common/TestUtils'

test('Signed-in user can sign out', async ({ page }) => {
  await page.goto('/auth/__dev/dev-signin')

  await page.locator('#emailId').fill('user1')
  await page.locator('#password').fill('awesome')

  await page.getByText('Sign in').click()

  await page.waitForNavigation({ waitUntil: 'networkidle' })

  await page.locator('button[aria-label="User menu"]').click()

  await page.getByText('Sign out').click()

  await page.waitForSelector('a:has-text("Sign in")')

  const getAuthMe = await page.context().request.get('/api/auth/me')

  const authMe = (await getAuthMe.json()) as AuthMeDTO

  expect(authMe.user).toBeUndefined()
})
