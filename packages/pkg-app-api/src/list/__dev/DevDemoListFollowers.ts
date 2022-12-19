import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { findListByOwnerAndRepo } from 'pkg-app-service/src/list/ListService'
import { findOrCreateListFollower } from 'pkg-app-service/src/list-follower/ListFollowerService'
import { findUserByEmail } from 'pkg-app-service/src/user/UserService'

export interface DevDemoListFollower {
  readonly owner: string
  readonly repo: string
  readonly followers: string[]
}

export const devDemoListFollowers: DevDemoListFollower[] = [
  {
    owner: 'sindresorhus',
    repo: 'awesome-nodejs',
    followers: ['user1@example.com'],
  },
  {
    owner: 'enaqx',
    repo: 'awesome-react',
    followers: ['user2@example.com'],
  },
  {
    owner: 'RunaCapital',
    repo: 'awesome-oss-alternatives',
    followers: ['user1@example.com', 'user2@example.com'],
  },
]

export const createDemoListFollowers = async () => {
  await prismaClient.$transaction(async (dbClient) => {
    for (const devDemoListFollower of devDemoListFollowers) {
      const { owner, repo, followers } = devDemoListFollower

      const list = await findListByOwnerAndRepo(dbClient, { owner, repo })

      for (const follower of followers) {
        const user = await findUserByEmail(dbClient, follower)

        await findOrCreateListFollower(dbClient, { list, user })
      }
    }
  })
}
