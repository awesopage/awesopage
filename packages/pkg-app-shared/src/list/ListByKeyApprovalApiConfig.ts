import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'

export const approveListApiConfig: ApiConfig<ListDTO, ListKeyDTO> = {
  name: 'approve list',
  method: 'post',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/approval`,
  isSignInRequired: true,
}
