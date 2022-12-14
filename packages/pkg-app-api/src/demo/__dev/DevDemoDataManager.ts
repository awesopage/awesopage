import { createDemoListFollowers } from 'pkg-app-api/src/list/__dev/DevDemoListFollowers'
import { createDemoLists } from 'pkg-app-api/src/list/__dev/DevDemoLists'
import { createDemoResources } from 'pkg-app-api/src/resource/__dev/DevDemoResources'
import { createDemoUsers } from 'pkg-app-api/src/user/__dev/DevDemoUsers'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'

export const devManageCreateDemoData = async () => {
  await truncateAllTables()
  await createDemoUsers()
  await createDemoLists()
  await createDemoListFollowers()
  await createDemoResources()
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
