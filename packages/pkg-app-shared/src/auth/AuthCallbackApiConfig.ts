import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import type { UserDTO } from 'pkg-app-shared/src/user/UserDTO'

export const handleAuthTokenApiConfig: ApiConfig<UserDTO, string> = {
  name: 'handle auth token',
  method: 'post',
  getPath: (token) => `/api/auth/callback?token=${encodeURIComponent(token)}`,
  isSignInRequired: false,
}
