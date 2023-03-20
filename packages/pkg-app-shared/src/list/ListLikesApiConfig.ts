import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'
import type { ListLikeDTO } from 'pkg-app-shared/src/list/ListLikeDTO'

export const likeListApiConfig: ApiConfig<ListLikeDTO, ListKeyDTO> = {
  name: 'like list',
  method: 'put',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/like`,
  isSignInRequired: true,
}

export const unlikeListApiConfig: ApiConfig<void, ListKeyDTO> = {
  name: 'unlike list',
  method: 'delete',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/like`,
  isSignInRequired: true,
}
