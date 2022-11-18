export type Role = 'ADMIN' | 'REVIEWER'

export interface UserDTO {
  readonly id: string
  readonly email: string
  readonly displayName: string
  readonly roles: Role[]
  readonly createdAt: string
  readonly updatedAt: string
}
