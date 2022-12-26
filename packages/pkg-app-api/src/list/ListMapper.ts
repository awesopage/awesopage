import { mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import type { List } from 'pkg-app-model/client'
import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'

export const mapListToDTO = (list: List): ListDTO => {
  const { id, owner, repo, description, starCount, tags } = list

  return {
    id: mapValueToString(id),
    owner,
    repo,
    description,
    starCount: Number(starCount),
    tags,
  }
}
