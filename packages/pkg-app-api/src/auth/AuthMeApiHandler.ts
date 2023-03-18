import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { mapUserToDTO } from 'pkg-app-api/src/user/UserMapper'
import { findUserByEmail } from 'pkg-app-api/src/user/UserService'
import type { User } from 'pkg-app-model/client'
import { getCurrentUserApiConfig } from 'pkg-app-shared/src/auth/AuthMeApiConfig'
import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'

export const authMeApiHandler: NextApiHandler = createApiRouter()
  .get(
    withApiConfig(getCurrentUserApiConfig, async (req, res) => {
      try {
        const { email } = req.session

        assertDefined(email, 'email')

        const currentUser: User = await prismaClient.$transaction((dbClient) => {
          return findUserByEmail(dbClient, email)
        })

        sendApiResponse(res, { user: mapUserToDTO(currentUser) })
      } catch {
        sendApiResponse(res, {})
      }
    }),
  )
  .handler()
