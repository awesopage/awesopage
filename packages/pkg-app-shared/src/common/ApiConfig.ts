export type ApiMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

export type ApiConfig<T, P = void> = Readonly<{
  name: string
  method: ApiMethod
  getPath: (params: P) => string
  isSignInRequired: boolean
  // Just for type checking, no need to define in real config
  __check__types?: (result: T, params: P) => void
}>
