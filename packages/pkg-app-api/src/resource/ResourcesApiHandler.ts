import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { mapResourceToDTO } from 'pkg-app-api/src/resource/ResourceMapper'
import type { ResourceWithLinks } from 'pkg-app-api/src/resource/ResourceService'
import { findResources } from 'pkg-app-api/src/resource/ResourceService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { findResourcesApiConfig } from 'pkg-app-shared/src/resource/ResourcesApiConfig'

export const resourcesApiHandler: NextApiHandler = createApiRouter()
  .get(
    withApiConfig(findResourcesApiConfig, async (req, res) => {
      const resources: ResourceWithLinks[] = await prismaClient.$transaction((dbClient) => {
        return findResources(dbClient)
      })

      sendApiResponse(res, resources.map(mapResourceToDTO))
    }),
  )
  .handler()
