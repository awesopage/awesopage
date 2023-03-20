import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListDetailsDTO } from 'pkg-app-shared/src/list/ListDetailsDTO'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'

export const likeListApiConfig: ApiConfig<ListDetailsDTO, ListKeyDTO> = {
  name: 'like list',
  method: 'post',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/likes`,
  isSignInRequired: true,
}

export const unlikeListApiConfig: ApiConfig<ListDetailsDTO, ListKeyDTO> = {
  name: 'unlike list',
  method: 'delete',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/likes`,
  isSignInRequired: true,
}
