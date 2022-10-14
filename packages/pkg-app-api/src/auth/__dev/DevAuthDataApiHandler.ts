import { NextApiHandler, NextApiResponse } from 'next'

import { sendApiError, sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'
import { createApiRouter } from 'pkg-app-api/src/router/ApiRouter'
import { signAuthData } from 'pkg-app-service/src/auth/AuthDataSigner'
import { DevCreateSignedAuthDataDTO } from 'pkg-app-shared/src/auth/__dev/DevCreateSignedAuthDataDTO'
import { DevSignedAuthDataDTO } from 'pkg-app-shared/src/auth/__dev/DevSignedAuthDataDTO'
import { assertDefined } from 'pkg-lib-common/src/AssertUtils'

export const DevAuthDataApiHandler: NextApiHandler = createApiRouter()
  .post(async (req, res: NextApiResponse<DevSignedAuthDataDTO>) => {
    assertDefined(process.env.DEV_AUTH_SIGNER_PRIVATE_KEY, 'DEV_AUTH_SIGNER_PRIVATE_KEY')
    assertDefined(process.env.DEV_AUTH_PASSWORD, 'DEV_AUTH_PASSWORD')

    const { email, password, displayName, returnPath } = req.body as DevCreateSignedAuthDataDTO

    if (password !== process.env.DEV_AUTH_PASSWORD) {
      return sendApiError(res, 'ACCESS_DENIED')
    }

    const timestamp = `${Date.now()}`

    const signature = signAuthData(
      { email, displayName, returnPath, timestamp },
      process.env.DEV_AUTH_SIGNER_PRIVATE_KEY,
    )

    sendApiResponse(res, {
      email,
      displayName,
      returnPath,
      timestamp,
      signature,
    })
  })
  .handler()
