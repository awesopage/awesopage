import type { AuthMeDTO } from 'pkg-app-shared/src/auth/AuthMeDTO'
import type { UserDTO } from 'pkg-app-shared/src/user/UserDTO'
import { useAction } from 'pkg-app-store/src/common/ActionUtils'
import { apiClient } from 'pkg-app-store/src/common/ApiClient'
import { updateAppStore, useAppState } from 'pkg-app-store/src/store/AppStore'

export const useGetCurrentUser = () => {
  const [getCurrentUser, getCurrentUserState, getCurrentUserResult, getCurrentUserError] = useAction<
    UserDTO | undefined
  >(async () => {
    const authMe = await apiClient.get('/auth/me').json<AuthMeDTO>()

    updateAppStore((state) => {
      state.isAuthChecked = true
      state.currentUser = authMe.user
    })

    return authMe.user
  }, useAppState('currentUser'))

  return { getCurrentUser, getCurrentUserState, getCurrentUserResult, getCurrentUserError }
}

export const useSignOut = () => {
  const [signOut, signOutState, signOutResult, signOutError] = useAction(async () => {
    try {
      await apiClient.post({}, '/auth/signout').res()
    } catch {
      // Do nothing
    }

    updateAppStore((state) => {
      state.currentUser = undefined
    })
  })

  return { signOut, signOutState, signOutResult, signOutError }
}
