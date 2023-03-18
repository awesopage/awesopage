import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { requireListKey } from 'pkg-app-api/src/list/ListApiHelper'
import { mapListDetailsToDTO } from 'pkg-app-api/src/list/ListMapper'
import type { ListDetails } from 'pkg-app-api/src/list/ListService'
import { approveList, findListByKey } from 'pkg-app-api/src/list/ListService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, requireCurrentUser, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { approveListApiConfig } from 'pkg-app-shared/src/list/ListByKeyApprovalApiConfig'

export const listByKeyApprovalApiHandler: NextApiHandler = createApiRouter()
  .post(
    withApiConfig(approveListApiConfig, async (req, res) => {
      const currentUser = requireCurrentUser(req)
      const { owner, repo } = requireListKey(req)

      const listDetails: ListDetails = await prismaClient.$transaction(async (dbClient) => {
        await approveList(dbClient, {
          owner,
          repo,
          approvedByUser: currentUser,
        })

        return findListByKey(dbClient, { owner, repo })
      })

      sendApiResponse(res, mapListDetailsToDTO(listDetails))
    }),
  )
  .handler()
