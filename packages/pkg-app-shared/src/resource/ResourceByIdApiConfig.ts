import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { ResourceDTO } from 'pkg-app-shared/src/resource/ResourceDTO'

export const findResourceByIdApiConfig: ApiConfig<ResourceDTO, string> = {
  name: 'find resource by id',
  method: 'get',
  getPath: (resourceId) => `/api/resources/${resourceId}`,
  isSignInRequired: false,
}
