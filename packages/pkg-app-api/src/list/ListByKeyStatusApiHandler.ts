import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { requireListKey } from 'pkg-app-api/src/list/ListApiHelper'
import { mapListDetailsToDTO } from 'pkg-app-api/src/list/ListMapper'
import type { ListDetails } from 'pkg-app-api/src/list/ListService'
import { findListDetailsByKey, setListStatus } from 'pkg-app-api/src/list/ListService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, requireCurrentUser, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import type { SetListStatusDTO } from 'pkg-app-shared/src/list/ListByKeyStatusApiConfig'
import { setListStatusApiConfig } from 'pkg-app-shared/src/list/ListByKeyStatusApiConfig'

export const listByKeyStatusApiHandler: NextApiHandler = createApiRouter()
  .put(
    withApiConfig(setListStatusApiConfig, async (req, res) => {
      const { status } = req.body as SetListStatusDTO
      const currentUser = requireCurrentUser(req)
      const { owner, repo } = requireListKey(req)

      const listDetails: ListDetails = await prismaClient.$transaction(async (dbClient) => {
        await setListStatus(dbClient, {
          owner,
          repo,
          status,
          updatedByUser: currentUser,
        })

        return findListDetailsByKey(dbClient, { owner, repo })
      })

      sendApiResponse(res, mapListDetailsToDTO(listDetails))
    }),
  )
  .handler()
