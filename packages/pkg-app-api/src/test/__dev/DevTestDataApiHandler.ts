import { NextApiHandler, NextApiResponse } from 'next'

import { createTestApiRouter } from 'pkg-app-api/src/router/__dev/TestApiRouter'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'
import { devManageCreateTestData } from 'pkg-app-api/src/test/__dev/DevTestDataManager'

export const devTestDataApiHandler: NextApiHandler = createTestApiRouter()
  .post(async (req, res: NextApiResponse) => {
    await devManageCreateTestData()

    sendApiResponse(res, {})
  })
  .handler()
