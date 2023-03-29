import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'

export const likeListApiConfig: ApiConfig<ListDTO, ListKeyDTO> = {
  name: 'like list',
  method: 'post',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/likes`,
  isSignInRequired: true,
}

export const unlikeListApiConfig: ApiConfig<ListDTO, ListKeyDTO> = {
  name: 'unlike list',
  method: 'delete',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/likes`,
  isSignInRequired: true,
}
