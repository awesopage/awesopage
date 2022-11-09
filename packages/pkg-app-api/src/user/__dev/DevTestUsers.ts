import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { assignUserRoles, findOrCreateUser } from 'pkg-app-service/src/user/UserService'
import { Role } from 'pkg-app-shared/src/user/Role'

export interface DevTestUser {
  readonly email: string
  readonly displayName: string
  readonly roles?: Role[]
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
      const { email, displayName, roles } = devTestUser

      const user = await findOrCreateUser(dbClient, { email, displayName })

      if (roles) {
        await assignUserRoles(dbClient, user.id, roles)
      }
    }
  })
}
