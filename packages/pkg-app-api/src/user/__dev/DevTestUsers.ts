import { UserRoleEnum } from 'pkg-app-model/client'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { assignUserRoles, findOrCreateUser, findUserByEmail } from 'pkg-app-service/src/user/UserService'

export interface DevTestUser {
  readonly email: string
  readonly displayName: string
  readonly roles?: UserRoleEnum[]
}

export const devTestUsers: DevTestUser[] = [
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

export const createTestUsers = async () => {
  await prismaClient.$transaction(async (dbClient) => {
    for (const devTestUser of devTestUsers) {
      const { email, displayName } = devTestUser

      await findOrCreateUser(dbClient, { email, displayName })
    }

    const admin1 = await findUserByEmail(dbClient, 'admin1@example.com')

    for (const devTestUser of devTestUsers) {
      const { email, roles } = devTestUser

      if (roles) {
        await assignUserRoles(dbClient, { email, roles, assignedByUser: admin1 })
      }
    }
  })
}
