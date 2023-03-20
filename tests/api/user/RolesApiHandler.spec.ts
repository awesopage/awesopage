import { assignRolesApiConfig } from 'pkg-app-shared/src/user/RolesApiConfig'
import type { UserDTO } from 'pkg-app-shared/src/user/UserDTO'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testUserFinder, withAuth } from 'tests/data/TestUserData'

const assignRoles = createTestApiRequest(assignRolesApiConfig)

test.describe(assignRolesApiConfig.name, () => {
  test.describe('given signed in as role manager and role is ADMIN', () => {
    withAuth(testUserFinder.any(({ isRoleManager }) => isRoleManager))

    test('should return correct user', async ({ request }) => {
      const assignRolesResponse = await assignRoles(request, {
        email: 'user1@example.com',
        roles: ['ADMIN'],
      })
      const user = await assignRolesResponse.json()

      const expectedUser: Partial<UserDTO> = {
        email: 'user1@example.com',
        roles: ['ADMIN'],
      }

      expect(user).toMatchObject(expectedUser)
    })
  })
})

test.describe(assignRolesApiConfig.name, () => {
  test.describe('given signed in as admin but not role manager and role is ADMIN', () => {
    withAuth(
      testUserFinder.any(({ hasRole, isRoleManager, and, not }) => {
        return and(hasRole('ADMIN'), not(isRoleManager))
      }),
    )

    test('should return error', async ({ request }) => {
      const assignRolesResponse = await assignRoles(request, {
        email: 'user1@example.com',
        roles: ['ADMIN'],
      })

      expect(assignRolesResponse.ok()).toBe(false)
    })
  })
})

test.describe(assignRolesApiConfig.name, () => {
  test.describe('given signed in as admin and role is not ADMIN', () => {
    withAuth(testUserFinder.any(({ hasRole }) => hasRole('ADMIN')))

    test('should return correct user', async ({ request }) => {
      const assignRolesResponse = await assignRoles(request, {
        email: 'user2@example.com',
        roles: ['REVIEWER'],
      })
      const user = await assignRolesResponse.json()

      const expectedUser: Partial<UserDTO> = {
        email: 'user2@example.com',
        roles: ['REVIEWER'],
      }

      expect(user).toMatchObject(expectedUser)
    })
  })
})

test.describe(assignRolesApiConfig.name, () => {
  test.describe('given signed in but not admin', () => {
    withAuth(testUserFinder.any(({ hasRole, not }) => not(hasRole('ADMIN'))))

    test('should return error', async ({ request }) => {
      const assignRolesResponse = await assignRoles(request, {
        email: 'user1@example.com',
        roles: ['REVIEWER'],
      })

      expect(assignRolesResponse.ok()).toBe(false)
    })
  })
})

test.describe(assignRolesApiConfig.name, () => {
  test.describe('given not signed in', () => {
    test('should return error', async ({ request }) => {
      const assignRolesResponse = await assignRoles(request, {
        email: 'user2@example.com',
        roles: ['REVIEWER'],
      })

      expect(assignRolesResponse.ok()).toBe(false)
    })
  })
})
