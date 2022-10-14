import { authCallbackApiHandler } from 'pkg-app-api/src/auth/AuthCallbackApiHandler'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default authCallbackApiHandler
