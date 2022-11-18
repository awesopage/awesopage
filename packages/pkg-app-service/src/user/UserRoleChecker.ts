import { User, UserRoleEnum } from 'pkg-app-model/client'

export const requireRoles = (user: User, rolesToCheck: UserRoleEnum[]) => {
  if (user.roles.includes('ADMIN')) {
    return
  }

  if (rolesToCheck.every((roleToCheck) => !user.roles.includes(roleToCheck))) {
    throw new Error(`User ${user.email} has no role of [${rolesToCheck.join(', ')}]`)
  }
}
