import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { requireListKey } from 'pkg-app-api/src/list/ListApiHelper'
import { findListByKey } from 'pkg-app-api/src/list/ListService'
import { mapResourceDetailsToDTO } from 'pkg-app-api/src/resource/ResourceMapper'
import type { ResourceDetails } from 'pkg-app-api/src/resource/ResourceService'
import { findResourceDetailsByList } from 'pkg-app-api/src/resource/ResourceService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { getResourcesByListKeyApiConfig } from 'pkg-app-shared/src/list/ListByKeyResourcesApiConfig'

export const listByKeyResourcesApiHandler: NextApiHandler = createApiRouter()
  .get(
    withApiConfig(getResourcesByListKeyApiConfig, async (req, res) => {
      const { owner, repo } = requireListKey(req)

      const resources: ResourceDetails[] = await prismaClient.$transaction(async (dbClient) => {
        const list = await findListByKey(dbClient, { owner, repo })
        return findResourceDetailsByList(dbClient, list)
      })

      sendApiResponse(res, resources.map(mapResourceDetailsToDTO))
    }),
  )
  .handler()
