import IsEmail from 'isemail'

import { User, UserRoleEnum } from 'pkg-app-model/client'
import { DbClient } from 'pkg-app-model/src/common/DbClient'
import { requireRoles } from 'pkg-app-service/src/user/UserRoleChecker'

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

export interface AssignUserRolesOptions {
  readonly email: string
  readonly roles: UserRoleEnum[]
  readonly assignedByUser: User
}

export const assignUserRoles = async (dbClient: DbClient, options: AssignUserRolesOptions): Promise<User> => {
  const { email, roles, assignedByUser } = options

  if (assignedByUser.email !== process.env.EMAIL_CAN_ASSIGN_ROLES) {
    requireRoles(assignedByUser, ['ADMIN'])
  }

  const user = await dbClient.user.update({
    where: { email },
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
