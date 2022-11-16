import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { createList } from 'pkg-app-service/src/list/ListService'
import { findUserByEmail } from 'pkg-app-service/src/user/UserService'

export interface DevTestList {
  readonly repoKey: string
  readonly description: string
  readonly starCount: number
  readonly tags: string[]
  readonly requestedByEmail: string
}

export const devTestLists: DevTestList[] = [
  {
    repoKey: 'sindresorhus/awesome-nodejs',
    description: 'Delightful Node.js packages and resources',
    starCount: 47_800,
    tags: ['node', 'nodejs', 'javascript'],
    requestedByEmail: 'user1@example.com',
  },
  {
    repoKey: 'enaqx/awesome-react',
    description: 'A collection of awesome things regarding React ecosystem',
    starCount: 52_200,
    tags: ['react', 'react-native', 'react-tutorial', 'react-apps'],
    requestedByEmail: 'user2@example.com',
  },
  {
    repoKey: 'RunaCapital/awesome-oss-alternatives',
    description: 'Awesome list of open-source startup alternatives to well-known SaaS products',
    starCount: 12_400,
    tags: ['open-source', 'alternatives'],
    requestedByEmail: 'user1@example.com',
  },
]

export const createTestLists = async () => {
  await prismaClient.$transaction(async (dbClient) => {
    for (const devTestList of devTestLists) {
      const { repoKey, description, starCount, tags, requestedByEmail } = devTestList

      const requestedByUser = await findUserByEmail(dbClient, requestedByEmail)

      await createList(dbClient, { repoKey, description, starCount, tags, requestedByUser })
    }
  })
}
