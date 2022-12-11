import { List, ListFollower, User } from 'pkg-app-model/client'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { findListByOwnerAndRepo } from 'pkg-app-service/src/list/ListService'
import { findOrCreateListFollower, removeListFollower } from 'pkg-app-service/src/list-follower/ListFollowerService'

export const manageFindListByOwnerAndRepo = async (owner: string, repo: string): Promise<List> => {
  const list = await prismaClient.$transaction((dbClient) => {
    return findListByOwnerAndRepo(dbClient, { owner, repo })
  })

  return list
}

export const manageFindOrCreateListFollower = async (user: User, list: List): Promise<ListFollower> => {
  const listFollower = await prismaClient.$transaction((dbClient) => {
    return findOrCreateListFollower(dbClient, { user, list })
  })

  return listFollower
}

export const manageRemoveListFollower = async (user: User, list: List): Promise<ListFollower> => {
  const listFollower = await prismaClient.$transaction((dbClient) => {
    return removeListFollower(dbClient, { user, list })
  })

  return listFollower
}
