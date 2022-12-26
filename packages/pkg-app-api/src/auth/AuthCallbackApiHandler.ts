import type { NextApiHandler } from 'next'

import { manageProcessAuthData } from 'pkg-app-api/src/auth/AuthManager'
import { parseFormData } from 'pkg-app-api/src/common/FormDataParser'
import { mapErrorToString } from 'pkg-app-api/src/common/MapperUtils'
import { createApiRouter } from 'pkg-app-api/src/router/ApiRouter'
import type { AuthData } from 'pkg-app-service/src/auth/AuthDataSigner'
import { createLogger } from 'pkg-app-service/src/common/LoggingUtils'
import { assertDefined } from 'pkg-lib-common/src/AssertUtils'

const logger = createLogger('AuthCallbackApiHandler')

export const authCallbackApiHandler: NextApiHandler = createApiRouter()
  .post(async (req, res) => {
    assertDefined(process.env.NEXT_PUBLIC_APP_BASE_URL, 'NEXT_PUBLIC_APP_BASE_URL')

    try {
      const formData = await parseFormData<keyof AuthData | 'signature'>(req)

      const { email, displayName, returnPath, timestamp, signature } = formData

      assertDefined(email, 'email')
      assertDefined(timestamp, 'timestamp')
      assertDefined(signature, 'signature')

      const user = await manageProcessAuthData({ email, displayName, returnPath, timestamp }, signature)

      req.session.email = user.email

      await req.session.save()

      res.redirect(302, `${process.env.NEXT_PUBLIC_APP_BASE_URL}${returnPath ?? ''}`)
    } catch (err) {
      logger.debug(`Authentication error: ${mapErrorToString(err as Error)}`)

      res.redirect(302, `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth-error`)
    }
  })
  .handler()
