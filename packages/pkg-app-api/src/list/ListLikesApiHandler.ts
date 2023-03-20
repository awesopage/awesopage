import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { requireListKey } from 'pkg-app-api/src/list/ListApiHelper'
import { findOrCreateListLike, removeListLike } from 'pkg-app-api/src/list/ListLikeService'
import { mapListDetailsToDTO } from 'pkg-app-api/src/list/ListMapper'
import type { ListDetails } from 'pkg-app-api/src/list/ListService'
import { findListByKey, findListDetailsByKey } from 'pkg-app-api/src/list/ListService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, requireCurrentUser, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { likeListApiConfig, unlikeListApiConfig } from 'pkg-app-shared/src/list/ListLikesApiConfig'

export const listLikesApiHandler: NextApiHandler = createApiRouter()
  .post(
    withApiConfig(likeListApiConfig, async (req, res) => {
      const currentUser = requireCurrentUser(req)
      const { owner, repo } = requireListKey(req)

      const listDetails: ListDetails = await prismaClient.$transaction(async (dbClient) => {
        const list = await findListByKey(dbClient, { owner, repo })

        await findOrCreateListLike(dbClient, {
          list,
          user: currentUser,
        })

        return findListDetailsByKey(dbClient, { owner, repo })
      })

      sendApiResponse(res, mapListDetailsToDTO(listDetails))
    }),
  )
  .delete(
    withApiConfig(unlikeListApiConfig, async (req, res) => {
      const currentUser = requireCurrentUser(req)
      const { owner, repo } = requireListKey(req)

      const listDetails: ListDetails = await prismaClient.$transaction(async (dbClient) => {
        const list = await findListByKey(dbClient, { owner, repo })

        await removeListLike(dbClient, {
          list,
          user: currentUser,
        })

        return findListDetailsByKey(dbClient, { owner, repo })
      })

      sendApiResponse(res, mapListDetailsToDTO(listDetails))
    }),
  )
  .handler()
