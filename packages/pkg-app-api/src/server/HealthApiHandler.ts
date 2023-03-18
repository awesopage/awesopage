import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { createApiRouter, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { checkDatabaseHealth } from 'pkg-app-api/src/server/HealthService'
import { getHealthStatusApiConfig } from 'pkg-app-shared/src/server/HealthApiConfig'

export const healthApiHandler: NextApiHandler = createApiRouter()
  .get(
    withApiConfig(getHealthStatusApiConfig, async (req, res) => {
      const database = await checkDatabaseHealth(prismaClient)
      const ok = database

      res.status(ok ? 200 : 500).json({
        ok,
        database,
      })
    }),
  )
  .handler()
