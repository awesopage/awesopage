import { List, User } from 'pkg-app-model/client'
import { DbClient, maybe } from 'pkg-app-model/src/common/DbClient'
import { requireRoles } from 'pkg-app-service/src/user/UserRoleChecker'

export interface CreateListOptions {
  readonly owner: string
  readonly repo: string
  readonly requestedByUser: User
}

export const createList = async (dbClient: DbClient, options: CreateListOptions): Promise<List> => {
  const { owner, repo, requestedByUser } = options

  const existingList = maybe(
    await dbClient.list.findUnique({
      where: { owner_repo: { owner, repo } },
    }),
  )

  if (existingList) {
    throw new Error(`List ${owner}/${repo} already exists`)
  }

  const now = new Date()

  const list = await dbClient.list.create({
    data: {
      owner,
      repo,
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
  readonly owner: string
  readonly repo: string
  readonly description?: string
  readonly starCount?: number
  readonly tags?: string[]
  readonly updatedByUser: User
}

export const updateList = async (dbClient: DbClient, options: UpdateListOptions): Promise<List> => {
  const { owner, repo, description, starCount, tags, updatedByUser } = options

  requireRoles(updatedByUser, ['REVIEWER'])

  await dbClient.list.findUniqueOrThrow({
    where: { owner_repo: { owner, repo } },
  })

  const list = await dbClient.list.update({
    where: { owner_repo: { owner, repo } },
    data: {
      description,
      starCount,
      tags,
      updatedAt: new Date(),
    },
  })

  return list
}

export interface ApproveListOptions {
  readonly owner: string
  readonly repo: string
  readonly approvedByUser: User
}

export const approveList = async (dbClient: DbClient, options: ApproveListOptions): Promise<List> => {
  const { owner, repo, approvedByUser } = options

  requireRoles(approvedByUser, ['REVIEWER'])

  const existingList = await dbClient.list.findUniqueOrThrow({
    where: { owner_repo: { owner, repo } },
  })

  if (approvedByUser.id === existingList.requestedById) {
    throw new Error(`User ${approvedByUser.email} cannot approve their own requested list ${owner}/${repo}`)
  }

  const list = await dbClient.list.update({
    where: { owner_repo: { owner, repo } },
    data: {
      status: 'ACTIVE',
      approvedById: approvedByUser.id,
      updatedAt: new Date(),
    },
  })

  return list
}

export const findActiveLists = async (dbClient: DbClient): Promise<List[]> => {
  const lists = await dbClient.list.findMany({
    where: { status: 'ACTIVE' },
  })

  return lists
}

export interface FindListByOwnerAndRepoOptions {
  readonly owner: string
  readonly repo: string
}

export const findListByOwnerAndRepo = async (
  dbClient: DbClient,
  options: FindListByOwnerAndRepoOptions,
): Promise<List> => {
  const { owner, repo } = options

  const list = await dbClient.list.findUniqueOrThrow({
    where: { owner_repo: { owner, repo } },
  })

  return list
}
