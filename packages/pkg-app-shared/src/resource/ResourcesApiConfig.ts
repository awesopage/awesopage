import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ResourceDTO } from 'pkg-app-shared/src/resource/ResourceDTO'

export const findResourcesApiConfig: ApiConfig<ResourceDTO[]> = {
  name: 'find resources',
  method: 'get',
  getPath: () => '/api/resources',
  isSignInRequired: false,
}
