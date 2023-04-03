import type { PartialDeep } from 'type-fest'

import type { RoleEnum } from 'pkg-app-model/client'
import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import type { UserDTO } from 'pkg-app-shared/src/user/UserDTO'
import { expect, test } from 'tests/common/TestUtils'
import type { Predicate } from 'tests/data/TestDataFinder'
import { createTestDataFinder } from 'tests/data/TestDataFinder'

export type TestUser = Readonly<{
  email: string
  displayName: string
  roles?: RoleEnum[]
}>

export const testUsers: TestUser[] = [
  {
    email: 'admin1@example.com',
    displayName: 'Admin 1',
    roles: ['ADMIN', 'REVIEWER'],
  },
  {
    email: 'admin2@example.com',
    displayName: 'Admin 2',
    roles: ['ADMIN', 'REVIEWER'],
  },
  {
    email: 'reviewer1@example.com',
    displayName: 'Reviewer 1',
    roles: ['REVIEWER'],
  },
  {
    email: 'reviewer2@example.com',
    displayName: 'Reviewer 2',
    roles: ['REVIEWER'],
  },
  {
    email: 'user1@example.com',
    displayName: 'User 1',
  },
  {
    email: 'user2@example.com',
    displayName: 'User 2',
  },
]

export const withAuth = (testUser: TestUser) => {
  test.use({
    storageState: `output/test/playwright/setup/${testUser.email.split('@')[0] ?? ''}-auth-state.json`,
  })
}

export const createExpectedUser = (testUser: TestUser, overrides?: PartialDeep<UserDTO>): PartialDeep<UserDTO> => {
  const { email, displayName, roles } = testUser

  return {
    email,
    displayName,
    roles: roles ?? [],
    ...overrides,
  }
}

export const assertUser = (user: UserDTO, expectedUser?: PartialDeep<UserDTO>) => {
  expect(user.id).toBeDefined()
  expect(user.updatedAt >= user.createdAt).toBe(true)

  if (expectedUser) {
    expect(user).toMatchObject(expectedUser)
  }
}

export const testUserFinder = createTestDataFinder(testUsers, ({ and }) => {
  assertDefined(process.env.APP_ROLE_MANAGER_EMAIL, 'APP_ROLE_MANAGER_EMAIL')

  const hasRole = (role: RoleEnum): Predicate<TestUser> => {
    return ({ roles }) => !!roles?.includes(role)
  }

  const hasNoRole: Predicate<TestUser> = ({ roles }) => !roles?.length

  const isRoleManager: Predicate<TestUser> = and(
    hasRole('ADMIN'),
    ({ email }) => email === process.env.APP_ROLE_MANAGER_EMAIL,
  )

  return { hasRole, hasNoRole, isRoleManager }
})
