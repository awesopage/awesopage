import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListDetailsDTO } from 'pkg-app-shared/src/list/ListDetailsDTO'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'

export const approveListApiConfig: ApiConfig<ListDetailsDTO, ListKeyDTO> = {
  name: 'approve list',
  method: 'post',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/approval`,
  isSignInRequired: true,
}
