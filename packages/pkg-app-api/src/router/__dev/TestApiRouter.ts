import { checkProfile, createApiRouter } from 'pkg-app-api/src/router/ApiRouter'

export const createTestApiRouter = () => {
  return createApiRouter().use(checkProfile('test'))
}
