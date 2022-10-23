import { NextApiHandler, NextApiResponse } from 'next'

import { createTestApiRouter } from 'pkg-app-api/src/router/__dev/TestApiRouter'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'

export const devTestCoverageApiHandler: NextApiHandler = createTestApiRouter()
  .post(async (req, res: NextApiResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendApiResponse(res, (globalThis as any).__coverage__ ?? {})
  })
  .handler()
