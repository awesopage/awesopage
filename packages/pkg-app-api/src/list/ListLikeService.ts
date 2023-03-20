import type { DbClient } from 'pkg-app-api/src/common/DbClient'
import type { List, ListLike, User } from 'pkg-app-model/client'

export type FindOrCreateListLikeOptions = Readonly<{
  list: List
  user: User
}>

export const findOrCreateListLike = async (
  dbClient: DbClient,
  options: FindOrCreateListLikeOptions,
): Promise<ListLike> => {
  const { list, user } = options

  const listLike = await dbClient.listLike.upsert({
    where: {
      listId_userId: {
        listId: list.id,
        userId: user.id,
      },
    },
    create: {
      listId: list.id,
      userId: user.id,
      createdAt: new Date(),
    },
    update: {},
  })

  return listLike
}

export type RemoveListLikeOptions = Readonly<{
  list: List
  user: User
}>

export const removeListLike = async (dbClient: DbClient, options: RemoveListLikeOptions) => {
  const { list, user } = options

  // delete issue: https://github.com/prisma/prisma/issues/9460
  await dbClient.listLike.deleteMany({
    where: {
      listId: list.id,
      userId: user.id,
    },
  })
}
