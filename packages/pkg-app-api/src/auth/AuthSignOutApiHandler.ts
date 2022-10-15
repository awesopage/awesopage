import { NextApiHandler, NextApiResponse } from 'next'

import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'
import { createApiRouter } from 'pkg-app-api/src/router/ApiRouter'

export const authSignOutApiHandler: NextApiHandler = createApiRouter()
  .post(async (req, res: NextApiResponse<Record<string, never>>) => {
    req.session.destroy()

    sendApiResponse(res, {})
  })
  .handler()
