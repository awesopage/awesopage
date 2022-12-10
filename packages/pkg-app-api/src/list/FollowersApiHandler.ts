import { NextApiHandler, NextApiResponse } from 'next'

import { mapListFollowerToDTO } from 'pkg-app-api/src/list/ListFollowerMapper'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseSender'
import { checkSignedIn, createApiRouter, requireUser } from 'pkg-app-api/src/router/ApiRouter'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { findListByOwnerAndRepo } from 'pkg-app-service/src/list/ListService'
import { findOrCreateListFollower, removeListFollower } from 'pkg-app-service/src/list-follower/ListFollowerService'
import { ListFollowerDTO } from 'pkg-app-shared/src/list-follower/ListFollowerDTO'
import { assertDefined } from 'pkg-lib-common/src/AssertUtils'
import { getQueryValue } from 'pkg-lib-common/src/QueryUtils'

export const followersApiHandler: NextApiHandler = createApiRouter()
  .all(checkSignedIn(), async (req, res: NextApiResponse<ListFollowerDTO>) => {
    const user = requireUser(req)

    const owner = getQueryValue(req.query.owner)
    const repo = getQueryValue(req.query.repo)

    assertDefined(owner, 'owner')
    assertDefined(repo, 'repo')

    const list = await findListByOwnerAndRepo(prismaClient, { owner, repo })
    if (req.method === 'PUT') {
      const listFollower = await findOrCreateListFollower(prismaClient, { user, list })

      sendApiResponse(res, mapListFollowerToDTO(listFollower))
    } else if (req.method === 'DELETE') {
      const listFollower = await removeListFollower(prismaClient, { user, list })

      sendApiResponse(res, mapListFollowerToDTO(listFollower))
    }
  })
  .handler()
