import type { RoleEnum, User } from 'pkg-app-model/client'

export const requireRole = (user: User, allowedRoles: RoleEnum[]) => {
  const hasAllowedRole = allowedRoles.some((allowedRole) => user.roles.includes(allowedRole))

  if (!hasAllowedRole) {
    throw new Error(`User ${user.email} does not have one of roles [${allowedRoles.join(', ')}]`)
  }
}
