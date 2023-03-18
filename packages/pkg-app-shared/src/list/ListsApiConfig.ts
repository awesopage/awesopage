import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListDetailsDTO } from 'pkg-app-shared/src/list/ListDetailsDTO'
import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'

export type CreateListOptionsDTO = Readonly<{
  owner: string
  repo: string
}>

export const createListApiConfig: ApiConfig<ListDetailsDTO, CreateListOptionsDTO> = {
  name: 'create list',
  method: 'post',
  getPath: () => '/api/lists',
  isSignInRequired: true,
}

export const findActiveListsApiConfig: ApiConfig<ListDTO[]> = {
  name: 'find active lists',
  method: 'get',
  getPath: () => '/api/lists',
  isSignInRequired: false,
}
