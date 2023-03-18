import { getCurrentUserApiConfig } from 'pkg-app-shared/src/auth/AuthMeApiConfig'
import type { UserDTO } from 'pkg-app-shared/src/user/UserDTO'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testUserFinder, withAuth } from 'tests/data/TestUserData'

const getCurrentUser = createTestApiRequest(getCurrentUserApiConfig)

test.describe(getCurrentUserApiConfig.name, () => {
  test.describe('given signed in', () => {
    const user = testUserFinder.any(({ hasNoRole }) => hasNoRole)

    withAuth(user)

    test('should return correct user', async ({ request }) => {
      const getCurrentUserResponse = await getCurrentUser(request)
      const authMe = await getCurrentUserResponse.json()

      const expectedUser: Partial<UserDTO> = {
        email: user.email,
        displayName: user.displayName,
        roles: user.roles ?? [],
      }

      expect(authMe.user).toMatchObject(expectedUser)
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
