import { NextApiHandler, NextApiResponse } from 'next'

import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'
import { createApiRouter } from 'pkg-app-api/src/router/ApiRouter'

export const devTestCoverageApiHandler: NextApiHandler = createApiRouter()
  .get(async (req, res: NextApiResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendApiResponse(res, (global as any).__coverage__ ?? {})
  })
  .handler()
