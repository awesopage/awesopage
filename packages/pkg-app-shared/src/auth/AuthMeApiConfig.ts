import type { AuthMeDTO } from 'pkg-app-shared/src/auth/AuthMeDTO'
import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'

export const getCurrentUserApiConfig: ApiConfig<AuthMeDTO> = {
  name: 'get current user',
  method: 'get',
  getPath: () => '/api/auth/me',
  // Send empty response instead of UNAUTHORIZED error when not signed in
  isSignInRequired: false,
}
