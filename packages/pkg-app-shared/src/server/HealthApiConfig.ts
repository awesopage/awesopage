import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { HealthStatusDTO } from 'pkg-app-shared/src/server/HealthStatusDTO'

export const getHealthStatusApiConfig: ApiConfig<HealthStatusDTO> = {
  name: 'get health status',
  method: 'get',
  getPath: () => '/api/server/health',
  isSignInRequired: false,
}
