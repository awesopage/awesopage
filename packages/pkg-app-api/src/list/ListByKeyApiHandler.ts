import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { requireListKey } from 'pkg-app-api/src/list/ListApiHelper'
import { mapListDetailsToDTO } from 'pkg-app-api/src/list/ListMapper'
import type { ListDetails } from 'pkg-app-api/src/list/ListService'
import { findListDetailsByKey, updateList } from 'pkg-app-api/src/list/ListService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, requireCurrentUser, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import type { UpdateListOptionsDTO } from 'pkg-app-shared/src/list/ListByKeyApiConfig'
import { findListDetailsByKeyApiConfig, updateListApiConfig } from 'pkg-app-shared/src/list/ListByKeyApiConfig'

export const listByKeyApiHandler: NextApiHandler = createApiRouter()
  .patch(
    withApiConfig(updateListApiConfig, async (req, res) => {
      const { description, starCount, tags } = req.body as UpdateListOptionsDTO
      const currentUser = requireCurrentUser(req)
      const { owner, repo } = requireListKey(req)

      const listDetails: ListDetails = await prismaClient.$transaction(async (dbClient) => {
        await updateList(dbClient, {
          owner,
          repo,
          description,
          starCount,
          tags,
          updatedByUser: currentUser,
        })

        return findListDetailsByKey(dbClient, { owner, repo })
      })

      sendApiResponse(res, mapListDetailsToDTO(listDetails))
    }),
  )
  .get(
    withApiConfig(findListDetailsByKeyApiConfig, async (req, res) => {
      const { owner, repo } = requireListKey(req)

      const listDetails: ListDetails = await findListDetailsByKey(prismaClient, { owner, repo })

      sendApiResponse(res, mapListDetailsToDTO(listDetails))
    }),
  )
  .handler()
