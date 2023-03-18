import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListDetailsDTO } from 'pkg-app-shared/src/list/ListDetailsDTO'
import type { ListStatus } from 'pkg-app-shared/src/list/ListDTO'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'

export type SetListStatusDTO = ListKeyDTO &
  Readonly<{
    status: ListStatus
  }>

export const setListStatusApiConfig: ApiConfig<ListDetailsDTO, SetListStatusDTO> = {
  name: 'set list status',
  method: 'put',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/status`,
  isSignInRequired: true,
}
