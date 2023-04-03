import * as iron from '@hapi/iron'

import type { AuthInfo } from 'pkg-app-api/src/auth/AuthService'
import { handleAuthTokenApiConfig } from 'pkg-app-shared/src/auth/AuthCallbackApiConfig'
import { getCurrentUserApiConfig } from 'pkg-app-shared/src/auth/AuthMeApiConfig'
import type { AuthMeDTO } from 'pkg-app-shared/src/auth/AuthMeDTO'
import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import type { UserDTO } from 'pkg-app-shared/src/user/UserDTO'
import type { TestApiResponse } from 'tests/common/TestUtils'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { assertUser } from 'tests/data/TestUserData'

const handleAuthToken = createTestApiRequest(handleAuthTokenApiConfig)
const getCurrentUser = createTestApiRequest(getCurrentUserApiConfig)

const testReturnUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/welcome`

test.describe(handleAuthTokenApiConfig.name, () => {
  test.describe('given valid token without return url', () => {
    test('should create session and return correct user', async ({ request }) => {
      const token = await getAuthToken({
        email: 'test_user@example.com',
        displayName: 'Test User',
      })

      const handleAuthTokenResponse = await handleAuthToken(request, token)
      const user = await handleAuthTokenResponse.json()

      const expectedUser: Partial<UserDTO> = {
        email: 'test_user@example.com',
        displayName: 'Test User',
      }

      assertUser(user, expectedUser)

      const getCurrentUserResponse = await getCurrentUser(request)
      const authMe = await getCurrentUserResponse.json()

      assertDefined(authMe.user, 'authMe.user')
      assertUser(authMe.user, expectedUser)
    })
  })
})

test.describe(handleAuthTokenApiConfig.name, () => {
  test.describe('given valid token with return url', () => {
    test('should create session and redirect to correct url', async ({ request }) => {
      const token = await getAuthToken({
        email: 'test_user@example.com',
        returnUrl: testReturnUrl,
      })

      const handleAuthTokenResponse = await handleAuthToken(request, token)

      expect(handleAuthTokenResponse.url()).toBe(testReturnUrl)

      const getCurrentUserResponse = await getCurrentUser(request)
      const authMe = await getCurrentUserResponse.json()

      expect(authMe.user).toBeDefined()
    })
  })
})

test.describe(handleAuthTokenApiConfig.name, () => {
  test.describe('given valid token but with invalid email', () => {
    test('should create no session and redirect to auth error page', async ({ request }) => {
      const token = await getAuthToken({
        email: 'test_user',
        returnUrl: testReturnUrl,
      })

      const handleAuthTokenResponse = await handleAuthToken(request, token)
      const getCurrentUserResponse = await getCurrentUser(request)

      await expectAuthCallbackError(handleAuthTokenResponse, getCurrentUserResponse)
    })
  })
})

test.describe(handleAuthTokenApiConfig.name, () => {
  test.describe('given valid token but from different secret', () => {
    test('should create no session and redirect to auth error page', async ({ request }) => {
      const token = await getAuthToken(
        {
          email: 'test_user@example.com',
          returnUrl: testReturnUrl,
        },
        'local__app__auth__different__secret',
      )

      const handleAuthTokenResponse = await handleAuthToken(request, token)
      const getCurrentUserResponse = await getCurrentUser(request)

      await expectAuthCallbackError(handleAuthTokenResponse, getCurrentUserResponse)
    })
  })
})

test.describe(handleAuthTokenApiConfig.name, () => {
  test.describe('given invalid token', () => {
    test('should create no session and redirect to auth error page', async ({ request }) => {
      const handleAuthTokenResponse = await handleAuthToken(request, 'test_token')
      const getCurrentUserResponse = await getCurrentUser(request)

      await expectAuthCallbackError(handleAuthTokenResponse, getCurrentUserResponse)
    })
  })
})

const getAuthToken = (authInfo: AuthInfo, secret?: string): Promise<string> => {
  return iron.seal(authInfo, secret ?? process.env.APP_AUTH_SECRET ?? '', {
    ...iron.defaults,
    ttl: 60_000,
  })
}

const expectAuthCallbackError = async (
  handleAuthTokenResponse: TestApiResponse<UserDTO>,
  getCurrentUserResponse: TestApiResponse<AuthMeDTO>,
) => {
  expect(handleAuthTokenResponse.url()).toBe(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth-error`)

  const authMe = await getCurrentUserResponse.json()

  expect(authMe.user).toBeUndefined()
}
