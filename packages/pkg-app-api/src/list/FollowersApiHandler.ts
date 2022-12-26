import type { NextApiHandler, NextApiResponse } from 'next'

import { requireListOwnerAndRepo } from 'pkg-app-api/src/list/ListApiHelper'
import { manageFindOrCreateListFollower, manageRemoveListFollower } from 'pkg-app-api/src/list/ListFollowerManager'
import { mapListFollowerToDTO } from 'pkg-app-api/src/list/ListFollowerMapper'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'
import { checkSignedIn, createApiRouter, requireUser } from 'pkg-app-api/src/router/ApiRouter'
import type { ListFollowerDTO } from 'pkg-app-shared/src/list-follower/ListFollowerDTO'

export const followersApiHandler: NextApiHandler = createApiRouter()
  .use(checkSignedIn())
  .put(async (req, res: NextApiResponse<ListFollowerDTO>) => {
    const user = requireUser(req)

    const { owner, repo } = requireListOwnerAndRepo(req)

    const listFollower = await manageFindOrCreateListFollower({ owner, repo, user })

    sendApiResponse(res, mapListFollowerToDTO(listFollower))
  })
  .delete(async (req, res: NextApiResponse<ListFollowerDTO>) => {
    const user = requireUser(req)

    const { owner, repo } = requireListOwnerAndRepo(req)

    const listFollower = await manageRemoveListFollower({ owner, repo, user })

    sendApiResponse(res, mapListFollowerToDTO(listFollower))
  })
  .handler()
