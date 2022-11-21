import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { approveList, createList, updateList } from 'pkg-app-service/src/list/ListService'
import { findUserByEmail } from 'pkg-app-service/src/user/UserService'

export interface DevDemoList {
  readonly repoKey: string
  readonly description: string
  readonly starCount: number
  readonly tags: string[]
  readonly requestedByEmail: string
  readonly approvedByEmail?: string
}

export const devDemoLists: DevDemoList[] = [
  {
    repoKey: 'sindresorhus/awesome-nodejs',
    description: 'Delightful Node.js packages and resources',
    starCount: 47_800,
    tags: ['node', 'nodejs', 'javascript'],
    requestedByEmail: 'user1@example.com',
    approvedByEmail: 'reviewer2@example.com',
  },
  {
    repoKey: 'enaqx/awesome-react',
    description: 'A collection of awesome things regarding React ecosystem',
    starCount: 52_200,
    tags: ['react', 'react-native', 'react-tutorial', 'react-apps'],
    requestedByEmail: 'user2@example.com',
    approvedByEmail: 'reviewer1@example.com',
  },
  {
    repoKey: 'RunaCapital/awesome-oss-alternatives',
    description: 'Awesome list of open-source startup alternatives to well-known SaaS products',
    starCount: 12_400,
    tags: ['open-source', 'alternatives'],
    requestedByEmail: 'user1@example.com',
  },
]

export const createDemoLists = async () => {
  await prismaClient.$transaction(async (dbClient) => {
    const admin1 = await findUserByEmail(dbClient, 'admin1@example.com')

    for (const devDemoList of devDemoLists) {
      const { repoKey, description, starCount, tags, requestedByEmail, approvedByEmail } = devDemoList

      const requestedByUser = await findUserByEmail(dbClient, requestedByEmail)

      await createList(dbClient, { repoKey, requestedByUser })

      await updateList(dbClient, { repoKey, description, starCount, tags, updatedByUser: admin1 })

      if (approvedByEmail) {
        const approvedByUser = await findUserByEmail(dbClient, approvedByEmail)

        await approveList(dbClient, { repoKey, approvedByUser })
      }
    }
  })
}
