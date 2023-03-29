import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'

export type CreateListOptionsDTO = ListKeyDTO

export const createListApiConfig: ApiConfig<ListDTO, CreateListOptionsDTO> = {
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
