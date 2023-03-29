import type { UserDTO } from 'pkg-app-shared/src/user/UserDTO'

export type ListStatus = 'ACTIVE' | 'INACTIVE'

export type ListDTO = Readonly<{
  id: string
  owner: string
  repo: string
  status: ListStatus
  description: string
  starCount: number
  tags: string[]
  updatedAt: string
  likeCount: number
  requestedAt: string
  requestedBy: UserDTO
  isApproved: boolean
  approvedBy?: UserDTO
}>
