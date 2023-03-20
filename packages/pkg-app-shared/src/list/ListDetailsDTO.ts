import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'
import type { UserDTO } from 'pkg-app-shared/src/user/UserDTO'

export type ListDetailsDTO = ListDTO &
  Readonly<{
    likeCount: number
    requestedBy: UserDTO
    approvedBy?: UserDTO
  }>
