import { mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import { List } from 'pkg-app-model/client'
import { ListDTO } from 'pkg-app-shared/src/list/ListDTO'

export const mapListToDTO = (list: List): ListDTO => {
  const { id, repoKey, description, starCount, tags } = list

  return {
    id: mapValueToString(id),
    repoKey,
    description,
    starCount: Number(starCount),
    tags,
  }
}
