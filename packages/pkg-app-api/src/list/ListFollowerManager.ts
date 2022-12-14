import { ListFollower, User } from 'pkg-app-model/client'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { findListByOwnerAndRepo } from 'pkg-app-service/src/list/ListService'
import { findOrCreateListFollower, removeListFollower } from 'pkg-app-service/src/list-follower/ListFollowerService'

export interface ManageFindOrCreateListFollowerOptions {
  readonly owner: string
  readonly repo: string
  readonly user: User
}

export const manageFindOrCreateListFollower = async (
  options: ManageFindOrCreateListFollowerOptions,
): Promise<ListFollower> => {
  const { owner, repo, user } = options

  const listFollower = await prismaClient.$transaction(async (dbClient) => {
    const list = await findListByOwnerAndRepo(dbClient, { owner, repo })

    return findOrCreateListFollower(dbClient, { user, list })
  })

  return listFollower
}

export interface ManageRemoveListFollowerOptions {
  readonly owner: string
  readonly repo: string
  readonly user: User
}

export const manageRemoveListFollower = async (options: ManageRemoveListFollowerOptions): Promise<ListFollower> => {
  const { owner, repo, user } = options

  const listFollower = await prismaClient.$transaction(async (dbClient) => {
    const list = await findListByOwnerAndRepo(dbClient, { owner, repo })

    return removeListFollower(dbClient, { user, list })
  })

  return listFollower
}
