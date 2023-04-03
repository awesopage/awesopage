import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'
import type { ResourceDTO } from 'pkg-app-shared/src/resource/ResourceDTO'

export const getResourcesByListKeyApiConfig: ApiConfig<ResourceDTO[], ListKeyDTO> = {
  name: 'get resources by list key',
  method: 'get',
  getPath: ({ owner, repo }) => `/api/lists/${owner}/${repo}/resources`,
  isSignInRequired: false,
}
