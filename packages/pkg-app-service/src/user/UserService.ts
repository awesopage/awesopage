import IsEmail from 'isemail'

import { User } from 'pkg-app-model/client'
import { DbClient } from 'pkg-app-model/src/common/DbClient'

export interface CreateOrUpdateUserOptions {
  readonly email: string
  readonly displayName: string
}

export const createOrUpdateUser = async (dbClient: DbClient, options: CreateOrUpdateUserOptions): Promise<User> => {
  const { email, displayName } = options

  if (!IsEmail.validate(email)) {
    throw new Error('Email is invalid')
  }

  const now = new Date()

  const user = await dbClient.user.upsert({
    where: { email },
    create: { email, displayName, roles: [], createdAt: now, updatedAt: now },
    update: { displayName, updatedAt: now },
  })

  return user
}
