import { Role } from 'pkg-app-shared/src/user/Role'

export interface UserDTO {
  readonly id: string
  readonly email: string
  readonly displayName: string
  readonly roles: Role[]
  readonly createdAt: string
  readonly updatedAt: string
}
