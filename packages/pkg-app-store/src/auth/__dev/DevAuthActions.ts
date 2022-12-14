import type { DevCreateSignedAuthDataDTO } from 'pkg-app-shared/src/auth/__dev/DevCreateSignedAuthDataDTO'
import type { DevSignedAuthDataDTO } from 'pkg-app-shared/src/auth/__dev/DevSignedAuthDataDTO'
import { useAction } from 'pkg-app-store/src/common/ActionUtils'
import { apiClient } from 'pkg-app-store/src/common/ApiClient'

export const useDevCreateSignedAuthData = () => {
  const [createSignedAuthData, createSignedAuthDataState, createSignedAuthDataResult, createSignedAuthDataError] =
    useAction<DevSignedAuthDataDTO, DevCreateSignedAuthDataDTO>(async (options) => {
      const signedAuthData = await apiClient.post(options, '/auth/__dev/dev-auth-data').json<DevSignedAuthDataDTO>()

      return signedAuthData
    })

  return { createSignedAuthData, createSignedAuthDataState, createSignedAuthDataResult, createSignedAuthDataError }
}
