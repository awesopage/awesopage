import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListDetailsDTO } from 'pkg-app-shared/src/list/ListDetailsDTO'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'

export type UpdateListOptionsDTO = ListKeyDTO &
  Readonly<{
    description?: string
    starCount?: number
    tags?: string[]
  }>

export const updateListApiConfig: ApiConfig<ListDetailsDTO, UpdateListOptionsDTO> = {
  name: 'update list',
  method: 'patch',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}`,
  isSignInRequired: true,
}

export const findListByKeyApiConfig: ApiConfig<ListDetailsDTO, ListKeyDTO> = {
  name: 'find list by key',
  method: 'get',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}`,
  isSignInRequired: false,
}
