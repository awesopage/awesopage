import { NextApiHandler, NextApiResponse } from 'next'

import { devManageCreateDemoData } from 'pkg-app-api/src/demo/__dev/DevDemoDataManager'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'
import { createApiRouter } from 'pkg-app-api/src/router/ApiRouter'

export const devDemoDataApiHandler: NextApiHandler = createApiRouter()
  .post(async (req, res: NextApiResponse) => {
    await devManageCreateDemoData()

    sendApiResponse(res, {})
  })
  .handler()
