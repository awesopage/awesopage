import { NextApiHandler, NextApiResponse } from 'next'

import {
  manageFindListByOwnerAndRepo,
  manageFindOrCreateListFollower,
  manageRemoveListFollower,
} from 'pkg-app-api/src/list/ListFollowerManager'
import { mapListFollowerToDTO } from 'pkg-app-api/src/list/ListFollowerMapper'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'
import { checkSignedIn, createApiRouter, requireUser } from 'pkg-app-api/src/router/ApiRouter'
import { ListFollowerDTO } from 'pkg-app-shared/src/list-follower/ListFollowerDTO'
import { assertDefined } from 'pkg-lib-common/src/AssertUtils'
import { getQueryValue } from 'pkg-lib-common/src/QueryUtils'

export const followersApiHandler: NextApiHandler = createApiRouter()
  .use(checkSignedIn())
  .put(async (req, res: NextApiResponse<ListFollowerDTO>) => {
    const user = requireUser(req)

    const owner = getQueryValue(req.query.owner)
    const repo = getQueryValue(req.query.repo)

    assertDefined(owner, 'owner')
    assertDefined(repo, 'repo')

    const list = await manageFindListByOwnerAndRepo(owner, repo)

    const listFollower = await manageFindOrCreateListFollower(user, list)

    sendApiResponse(res, mapListFollowerToDTO(listFollower))
  })
  .delete(async (req, res: NextApiResponse<ListFollowerDTO>) => {
    const user = requireUser(req)

    const owner = getQueryValue(req.query.owner)
    const repo = getQueryValue(req.query.repo)

    assertDefined(owner, 'owner')
    assertDefined(repo, 'repo')

    const list = await manageFindListByOwnerAndRepo(owner, repo)
    const listFollower = await manageRemoveListFollower(user, list)

    sendApiResponse(res, mapListFollowerToDTO(listFollower))
  })
  .handler()
