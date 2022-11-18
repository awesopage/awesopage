import { List } from 'pkg-app-model/client'
import { DbClient } from 'pkg-app-model/src/common/DbClient'

export interface CreateListOptions {
  readonly repoKey: string
  readonly description: string
  readonly starCount: number
  readonly tags: string[]
  readonly requestedByEmail: string
}

export const createList = async (dbClient: DbClient, options: CreateListOptions): Promise<List> => {
  const { repoKey, description, starCount, requestedByEmail, tags } = options

  const now = new Date()

  const list = await dbClient.list.create({
    data: {
      repoKey,
      description,
      starCount,
      tags,
      requestedBy: { connect: { email: requestedByEmail } },
      requestedAt: now,
      updatedAt: now,
    },
  })

  return list
}
