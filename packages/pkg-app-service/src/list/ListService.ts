import { List, User } from 'pkg-app-model/client'
import { DbClient } from 'pkg-app-model/src/common/DbClient'

export interface createListOptions {
  readonly repoKey: string
  readonly description: string
  readonly starCount: number
  readonly tags: string[]
  readonly requestedByUser: User
}

export const createList = async (dbClient: DbClient, options: createListOptions): Promise<List> => {
  const { repoKey, description, starCount, requestedByUser, tags } = options

  const now = new Date()

  const list = await dbClient.list.create({
    data: {
      repoKey,
      description,
      starCount,
      tags,
      requestedBy: { connect: { id: requestedByUser.id } },
      requestedAt: now,
      updatedAt: now,
    },
  })

  return list
}
