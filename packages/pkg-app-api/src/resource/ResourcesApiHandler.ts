import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { mapResourceDetailsToDTO } from 'pkg-app-api/src/resource/ResourceMapper'
import type { ResourceDetails } from 'pkg-app-api/src/resource/ResourceService'
import { findResourceDetails } from 'pkg-app-api/src/resource/ResourceService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { findResourcesApiConfig } from 'pkg-app-shared/src/resource/ResourcesApiConfig'

export const resourcesApiHandler: NextApiHandler = createApiRouter()
  .get(
    withApiConfig(findResourcesApiConfig, async (req, res) => {
      const resources: ResourceDetails[] = await prismaClient.$transaction((dbClient) => {
        return findResourceDetails(dbClient)
      })

      sendApiResponse(res, resources.map(mapResourceDetailsToDTO))
    }),
  )
  .handler()
