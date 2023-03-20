import { mapTimestampToString, mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import type { ListLike } from 'pkg-app-model/client'
import type { ListLikeDTO } from 'pkg-app-shared/src/list/ListLikeDTO'

export const mapListLikeToDTO = (listLike: ListLike): ListLikeDTO => {
  const { id, createdAt, listId, userId } = listLike

  return {
    id: mapValueToString(id),
    listId: mapValueToString(listId),
    userId: mapValueToString(userId),
    createdAt: mapTimestampToString(createdAt),
  }
}
