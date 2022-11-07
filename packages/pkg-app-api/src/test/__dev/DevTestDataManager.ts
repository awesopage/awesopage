import { devTestUsers } from 'pkg-app-api/src/user/__dev/DevTestUsers'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { assignUserRoles, createOrUpdateUser } from 'pkg-app-service/src/user/UserService'

export const devManageCreateTestData = async () => {
  await truncateAllTables()
  await createTestUsers()
}

const createTestUsers = async () => {
  await prismaClient.$transaction(async (dbClient) => {
    for (const devTestUser of devTestUsers) {
      const { email, displayName, roles } = devTestUser

      const user = await createOrUpdateUser(dbClient, { email, displayName })

      if (roles) {
        await assignUserRoles(dbClient, user.id, roles)
      }
    }
  })
}

const truncateAllTables = async (): Promise<string[]> => {
  // Based on https://www.prisma.io/docs/concepts/components/prisma-client/crud#deleting-all-data-with-raw-sql--truncate
  const tableNameResults = await prismaClient.$queryRawUnsafe<{ tablename: string }[]>(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public'`,
  )

  const tableNames = tableNameResults
    .map(({ tablename }) => tablename)
    .filter((tableName) => !tableName.startsWith('_'))

  await prismaClient.$transaction(
    tableNames.map((tableName) => {
      return prismaClient.$executeRawUnsafe(`TRUNCATE TABLE ${tableName} CASCADE`)
    }),
  )

  return tableNames
}
