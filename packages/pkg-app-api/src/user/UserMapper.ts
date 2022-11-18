import { mapTimestampToString, mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import { User } from 'pkg-app-model/client'
import { UserDTO } from 'pkg-app-shared/src/user/UserDTO'

export const mapUserToDTO = (user: User): UserDTO => {
  const { id, email, displayName, roles, createdAt, updatedAt } = user

  return {
    id: mapValueToString(id),
    email,
    displayName,
    roles,
    createdAt: mapTimestampToString(createdAt),
    updatedAt: mapTimestampToString(updatedAt),
  }
}
