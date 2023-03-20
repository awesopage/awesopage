import type { NextApiHandler, NextApiResponse } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { requireListKey } from 'pkg-app-api/src/list/ListApiHelper'
import { mapListLikeToDTO } from 'pkg-app-api/src/list/ListLikeMapper'
import { findOrCreateListLike, removeListLike } from 'pkg-app-api/src/list/ListLikeService'
import { findListByKey } from 'pkg-app-api/src/list/ListService'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, requireCurrentUser, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import type { ListLike } from 'pkg-app-model/client'
import type { ListLikeDTO } from 'pkg-app-shared/src/list/ListLikeDTO'
import { likeListApiConfig, unlikeListApiConfig } from 'pkg-app-shared/src/list/ListLikesApiConfig'

export const listLikesApiHandler: NextApiHandler = createApiRouter()
  .put(
    withApiConfig(likeListApiConfig, async (req, res: NextApiResponse<ListLikeDTO>) => {
      const currentUser = requireCurrentUser(req)
      const { owner, repo } = requireListKey(req)

      const listLike: ListLike = await prismaClient.$transaction(async (dbClient) => {
        const list = await findListByKey(dbClient, { owner, repo })

        return findOrCreateListLike(dbClient, {
          list,
          user: currentUser,
        })
      })

      sendApiResponse(res, mapListLikeToDTO(listLike))
    }),
  )
  .delete(
    withApiConfig(unlikeListApiConfig, async (req, res) => {
      const currentUser = requireCurrentUser(req)
      const { owner, repo } = requireListKey(req)

      await prismaClient.$transaction(async (dbClient) => {
        const list = await findListByKey(dbClient, { owner, repo })

        return removeListLike(dbClient, {
          list,
          user: currentUser,
        })
      })

      sendApiResponse(res, undefined)
    }),
  )
  .handler()
