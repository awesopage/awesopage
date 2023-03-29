import { mapTimestampToString, mapValueToNumber, mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import type { ListDetails } from 'pkg-app-api/src/list/ListService'
import { mapUserToDTO } from 'pkg-app-api/src/user/UserMapper'
import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'

export const mapListDetailsToDTO = (listDetails: ListDetails): ListDTO => {
  const {
    id,
    owner,
    repo,
    status,
    description,
    starCount,
    tags,
    updatedAt,
    likeCount,
    requestedAt,
    requestedBy,
    isApproved,
    approvedBy,
  } = listDetails

  return {
    id: mapValueToString(id),
    owner,
    repo,
    status,
    description,
    starCount: mapValueToNumber(starCount),
    tags,
    updatedAt: mapTimestampToString(updatedAt),
    likeCount,
    requestedAt: mapTimestampToString(requestedAt),
    requestedBy: mapUserToDTO(requestedBy),
    isApproved,
    approvedBy: approvedBy ? mapUserToDTO(approvedBy) : undefined,
  }
}
