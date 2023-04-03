import { getCurrentUserApiConfig } from 'pkg-app-shared/src/auth/AuthMeApiConfig'
import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { assertUser, createExpectedUser, testUserFinder, withAuth } from 'tests/data/TestUserData'

const getCurrentUser = createTestApiRequest(getCurrentUserApiConfig)

test.describe(getCurrentUserApiConfig.name, () => {
  test.describe('given signed in', () => {
    const user = testUserFinder.any(({ hasNoRole }) => hasNoRole)

    withAuth(user)

    test('should return correct user', async ({ request }) => {
      const getCurrentUserResponse = await getCurrentUser(request)
      const authMe = await getCurrentUserResponse.json()

      assertDefined(authMe.user, 'authMe.user')
      assertUser(authMe.user, createExpectedUser(user))
    })
  })
})

test.describe(getCurrentUserApiConfig.name, () => {
  test.describe('given not signed in', () => {
    test('should return no user', async ({ request }) => {
      const getCurrentUserResponse = await getCurrentUser(request)
      const authMe = await getCurrentUserResponse.json()

      expect(authMe.user).toBeUndefined()
    })
  })
})
