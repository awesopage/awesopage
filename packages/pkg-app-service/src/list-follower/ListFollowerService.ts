import { List, ListFollower, User } from 'pkg-app-model/client'
import { DbClient } from 'pkg-app-model/src/common/DbClient'

export interface FindOrCreateListFollowerOptions {
  readonly list: List
  readonly user: User
}

export const findOrCreateListFollower = async (
  dbClient: DbClient,
  options: FindOrCreateListFollowerOptions,
): Promise<ListFollower> => {
  const { list, user } = options

  const now = new Date()

  const listFollower = await dbClient.listFollower.upsert({
    where: {
      listId_userId: {
        listId: list.id,
        userId: user.id,
      },
    },
    create: {
      listId: list.id,
      userId: user.id,
      followedAt: now,
    },
    update: {},
  })

  return listFollower
}

export interface RemoveListFollowerOptions {
  readonly list: List
  readonly user: User
}

export const removeListFollower = async (
  dbClient: DbClient,
  options: RemoveListFollowerOptions,
): Promise<ListFollower> => {
  const { list, user } = options

  const listFollower = await dbClient.listFollower.delete({
    where: {
      listId_userId: {
        listId: list.id,
        userId: user.id,
      },
    },
  })

  return listFollower
}
