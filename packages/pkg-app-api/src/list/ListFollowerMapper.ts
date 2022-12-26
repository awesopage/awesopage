import { mapTimestampToString, mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import type { ListFollower } from 'pkg-app-model/client'
import type { ListFollowerDTO } from 'pkg-app-shared/src/list-follower/ListFollowerDTO'

export const mapListFollowerToDTO = (listFollower: ListFollower): ListFollowerDTO => {
  const { id, followedAt, listId, userId } = listFollower

  return {
    id: mapValueToString(id),
    listId: mapValueToString(listId),
    userId: mapValueToString(userId),
    followedAt: mapTimestampToString(followedAt),
  }
}
