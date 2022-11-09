import IsEmail from 'isemail'

import { User } from 'pkg-app-model/client'
import { DbClient } from 'pkg-app-model/src/common/DbClient'

export interface FindOrCreateUserOptions {
  readonly email: string
  readonly displayName: string
}

export const findOrCreateUser = async (dbClient: DbClient, options: FindOrCreateUserOptions): Promise<User> => {
  const { email, displayName } = options

  if (!IsEmail.validate(email)) {
    throw new Error('Email is invalid')
  }

  const now = new Date()

  const user = await dbClient.user.upsert({
    where: { email },
    create: { email, displayName, roles: [], createdAt: now, updatedAt: now },
    update: {},
  })

  return user
}

export const assignUserRoles = async (dbClient: DbClient, userId: bigint, roles: string[]): Promise<User> => {
  const user = await dbClient.user.update({
    where: { id: userId },
    data: { roles, updatedAt: new Date() },
  })

  return user
}

export const findUserByEmail = async (dbClient: DbClient, email: string): Promise<User> => {
  const user = await dbClient.user.findUniqueOrThrow({
    where: { email },
  })

  return user
}
