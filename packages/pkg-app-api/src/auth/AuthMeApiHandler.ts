import type { NextApiHandler, NextApiResponse } from 'next'

import { manageFindAuthUser } from 'pkg-app-api/src/auth/AuthManager'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'
import { createApiRouter } from 'pkg-app-api/src/router/ApiRouter'
import { mapUserToDTO } from 'pkg-app-api/src/user/UserMapper'
import type { AuthMeDTO } from 'pkg-app-shared/src/auth/AuthMeDTO'
import { assertDefined } from 'pkg-lib-common/src/AssertUtils'

export const authMeApiHandler: NextApiHandler = createApiRouter()
  .get(async (req, res: NextApiResponse<AuthMeDTO>) => {
    try {
      const { email } = req.session

      assertDefined(email, 'email')

      const user = await manageFindAuthUser(email)

      sendApiResponse(res, { user: mapUserToDTO(user) })
    } catch {
      sendApiResponse(res, {})
    }
  })
  .handler()
