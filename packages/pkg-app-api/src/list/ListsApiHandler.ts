import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { mapListDetailsToDTO } from 'pkg-app-api/src/list/ListMapper'
import type { ListDetails } from 'pkg-app-api/src/list/ListService'
import { createList, findActiveListDetails, findListDetailsByKey } from 'pkg-app-api/src/list/ListService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, requireCurrentUser, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import type { CreateListOptionsDTO } from 'pkg-app-shared/src/list/ListsApiConfig'
import { createListApiConfig, findActiveListsApiConfig } from 'pkg-app-shared/src/list/ListsApiConfig'

export const listsApiHandler: NextApiHandler = createApiRouter()
  .get(
    withApiConfig(findActiveListsApiConfig, async (req, res) => {
      const activeLists: ListDetails[] = await prismaClient.$transaction((dbClient) => {
        return findActiveListDetails(dbClient)
      })

      sendApiResponse(res, activeLists.map(mapListDetailsToDTO))
    }),
  )
  .post(
    withApiConfig(createListApiConfig, async (req, res) => {
      const { owner, repo } = req.body as CreateListOptionsDTO
      const currentUser = requireCurrentUser(req)

      const listDetails: ListDetails = await prismaClient.$transaction(async (dbClient) => {
        await createList(dbClient, {
          owner,
          repo,
          requestedByUser: currentUser,
        })

        return findListDetailsByKey(dbClient, { owner, repo })
      })

      sendApiResponse(res, mapListDetailsToDTO(listDetails))
    }),
  )
  .handler()
