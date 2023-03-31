import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { requireResourceId } from 'pkg-app-api/src/resource/ResourceApiHelper'
import { mapResourceDetailsToDTO } from 'pkg-app-api/src/resource/ResourceMapper'
import type { ResourceDetails } from 'pkg-app-api/src/resource/ResourceService'
import { findResourceById } from 'pkg-app-api/src/resource/ResourceService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { findResourceByIdApiConfig } from 'pkg-app-shared/src/resource/ResourceByIdApiConfig'

export const resourceByIdApiHandler: NextApiHandler = createApiRouter()
  .get(
    withApiConfig(findResourceByIdApiConfig, async (req, res) => {
      const resourceId = requireResourceId(req)

      const resource: ResourceDetails = await prismaClient.$transaction((dbClient) => {
        return findResourceById(dbClient, resourceId)
      })

      sendApiResponse(res, mapResourceDetailsToDTO(resource))
    }),
  )
  .handler()
