import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter, NextHandler } from 'next-connect'

import { sendApiError } from 'pkg-app-api/src/router/ApiResponseSender'
import type { User } from 'pkg-app-model/client'
import { createLogger } from 'pkg-app-service/src/common/LoggingUtils'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { findUserByEmail } from 'pkg-app-service/src/user/UserService'
import { assertDefined } from 'pkg-lib-common/src/AssertUtils'

const logger = createLogger('ApiRouter')

export const checkProfile = (profile: string) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const profiles = process.env.APP_PROFILES ? process.env.APP_PROFILES.split(',') : []

    if (!profiles.includes(profile)) {
      logger.debug(`Profile ${profile} is required but not found in [${profiles.join(', ')}] of current environment`)

      return sendApiError(res, 'INTERNAL_SERVER_ERROR')
    }

    return next()
  }
}

// Declare email in session data by module augmentation
declare module 'iron-session' {
  interface IronSessionData {
    email?: string
  }
}

export const checkSignedIn = () => {
  return async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const reqWithUser = req as NextApiRequest & { user?: User }
    const { email } = reqWithUser.session

    if (!email) {
      logger.debug(`Session does not have email`)

      return sendApiError(res, 'UNAUTHORIZED')
    }

    const user: User = await prismaClient.$transaction((dbClient) => {
      return findUserByEmail(dbClient, email)
    })

    reqWithUser.user = user

    return next()
  }
}

export const requireUser = (req: NextApiRequest): User => {
  const { user } = req as NextApiRequest & { user?: User }

  if (!user) {
    throw new Error('Request does not have user')
  }

  return user
}

export const createApiRouter = () => {
  const router = createRouter<NextApiRequest, NextApiResponse>()

  // next-connect v1 does not allow to set default handler when creating router
  // so need to work around based on https://github.com/hoangvvo/next-connect/issues/201
  // and https://github.com/hoangvvo/next-connect/blob/main/src/node.ts

  const defaultHandler = router.handler.bind(router)

  router.handler = () => {
    assertDefined(process.env.APP_SESSION_SECRET, 'APP_SESSION_SECRET')

    const handlerWithSession = withIronSessionApiRoute(
      defaultHandler({
        onError: (err, req, res: NextApiResponse) => {
          sendApiError(res, 'INTERNAL_SERVER_ERROR', err as Error)
        },
        onNoMatch: (req, res: NextApiResponse) => {
          sendApiError(res, 'ROUTE_HANDLER_NOT_FOUND')
        },
      }),
      {
        password: process.env.APP_SESSION_SECRET,
        cookieName: 'app-session',
        cookieOptions: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      },
    )

    return async (req, res) => {
      await handlerWithSession(req, res)
    }
  }

  return router
}
