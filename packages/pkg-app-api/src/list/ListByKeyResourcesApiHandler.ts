import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { requireListKey } from 'pkg-app-api/src/list/ListApiHelper'
import { mapResourceToDTO } from 'pkg-app-api/src/resource/ResourceMapper'
import type { ResourceWithLinks } from 'pkg-app-api/src/resource/ResourceService'
import { findResourcesByListKey } from 'pkg-app-api/src/resource/ResourceService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { getResourcesByListKeyApiConfig } from 'pkg-app-shared/src/list/ListByKeyResourcesApiConfig'

export const listByKeyResourcesApiHandler: NextApiHandler = createApiRouter()
  .get(
    withApiConfig(getResourcesByListKeyApiConfig, async (req, res) => {
      const { owner, repo } = requireListKey(req)

      const resources: ResourceWithLinks[] = await prismaClient.$transaction(async (dbClient) => {
        return findResourcesByListKey(dbClient, {
          owner,
          repo,
        })
      })

      sendApiResponse(res, resources.map(mapResourceToDTO))
    }),
  )
  .handler()
