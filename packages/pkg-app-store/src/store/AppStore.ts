import produce, { Draft } from 'immer'
import createStoreHook from 'zustand'
import createStore from 'zustand/vanilla'

import { UserDTO } from 'pkg-app-shared/src/user/UserDTO'

export interface AppState {
  readonly isAuthChecked: boolean
  readonly currentUser?: UserDTO
}

const createInitialAppState = (): AppState => {
  return { isAuthChecked: false }
}

export const appStore = createStore<AppState>(createInitialAppState)

export const updateAppStore = (updateDraftState: (state: Draft<AppState>) => void) => {
  appStore.setState(
    produce((state) => {
      updateDraftState(state)
    }),
  )
}

const useAppStore = createStoreHook(appStore)

export const useAppState = <K extends keyof AppState>(key: K): AppState[K] => {
  return useAppStore((state) => state[key])
}

export const useRequiredAppState = <K extends keyof AppState>(key: K): Required<AppState>[K] => {
  const value = useAppStore((state) => state[key])

  if (typeof value === 'undefined') {
    throw new Error(`App state ${key} is undefined`)
  }

  return value as Required<AppState>[K]
}
