// iron-session/express provides express-style middleware, which can be used with next-connect.
import { ironSession } from 'iron-session/express'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter, expressWrapper } from 'next-connect'

import { sendApiError } from 'pkg-app-api/src/router/ApiResponseSender'
import { assertDefined } from 'pkg-lib-common/src/AssertUtils'

// Declare email in session data by module augmentation
declare module 'iron-session' {
  interface IronSessionData {
    email?: string
  }
}

const enableCookieSession = () => {
  assertDefined(process.env.APP_SESSION_SECRET, 'APP_SESSION_SECRET')

  const sessionHandler = ironSession({
    password: process.env.APP_SESSION_SECRET,
    cookieName: 'app-session',
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  })

  return expressWrapper(sessionHandler)
}

export const createApiRouter = <
  REQUEST extends NextApiRequest = NextApiRequest,
  RESPONSE extends NextApiResponse = NextApiResponse,
>() => {
  const router = createRouter<REQUEST, RESPONSE>().use(enableCookieSession())

  // next-connect v1 does not allow to set default handler when creating router
  // so need to work around based on https://github.com/hoangvvo/next-connect/issues/201
  // and https://github.com/hoangvvo/next-connect/blob/main/src/node.ts

  const defaultHandler = router.handler.bind(router)

  router.handler = () => {
    return defaultHandler({
      onError: (err, req, res: NextApiResponse) => {
        sendApiError(res, 'INTERNAL_SERVER_ERROR', err as Error)
      },
      onNoMatch: (req, res: NextApiResponse) => {
        sendApiError(res, 'ROUTE_HANDLER_NOT_FOUND')
      },
    })
  }

  return router
}
