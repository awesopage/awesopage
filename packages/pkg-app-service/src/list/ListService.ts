import { List, User } from 'pkg-app-model/client'
import { DbClient } from 'pkg-app-model/src/common/DbClient'
import { requireRoles } from 'pkg-app-service/src/user/UserRoleChecker'

export interface CreateListOptions {
  readonly repoKey: string
  readonly requestedByUser: User
}

export const createList = async (dbClient: DbClient, options: CreateListOptions): Promise<List> => {
  const { repoKey, requestedByUser } = options

  const now = new Date()

  const list = await dbClient.list.create({
    data: {
      repoKey,
      status: 'PENDING',
      description: '',
      starCount: 0,
      tags: [],
      requestedById: requestedByUser.id,
      requestedAt: now,
      updatedAt: now,
    },
  })

  return list
}

export interface UpdateListOptions {
  readonly repoKey: string
  readonly description?: string
  readonly starCount?: number
  readonly tags?: string[]
  readonly updatedByUser: User
}

export const updateList = async (dbClient: DbClient, options: UpdateListOptions): Promise<List> => {
  const { repoKey, description, starCount, tags, updatedByUser } = options

  requireRoles(updatedByUser, ['REVIEWER'])

  const list = await dbClient.list.update({
    where: { repoKey },
    data: {
      repoKey,
      description,
      starCount,
      tags,
      updatedAt: new Date(),
    },
  })

  return list
}

export interface ApproveListOptions {
  readonly repoKey: string
  readonly approvedByUser: User
}

export const approveList = async (dbClient: DbClient, options: ApproveListOptions): Promise<List> => {
  const { repoKey, approvedByUser } = options

  requireRoles(approvedByUser, ['REVIEWER'])

  const list = await dbClient.list.update({
    where: { repoKey },
    data: {
      status: 'ACTIVE',
      approvedById: approvedByUser.id,
      updatedAt: new Date(),
    },
  })

  return list
}
