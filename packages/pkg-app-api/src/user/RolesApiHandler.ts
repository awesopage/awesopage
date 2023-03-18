import type { NextApiHandler } from 'next'

import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { sendApiResponse } from 'pkg-app-api/src/router/ApiResponseHandler'
import { createApiRouter, requireCurrentUser, withApiConfig } from 'pkg-app-api/src/router/ApiRouter'
import { mapUserToDTO } from 'pkg-app-api/src/user/UserMapper'
import { assignRoles } from 'pkg-app-api/src/user/UserService'
import type { User } from 'pkg-app-model/client'
import type { AssignRolesOptionsDTO } from 'pkg-app-shared/src/user/RolesApiConfig'
import { assignRolesApiConfig } from 'pkg-app-shared/src/user/RolesApiConfig'

export const rolesApiHandler: NextApiHandler = createApiRouter()
  .post(
    withApiConfig(assignRolesApiConfig, async (req, res) => {
      const { email, roles } = req.body as AssignRolesOptionsDTO
      const currentUser = requireCurrentUser(req)

      const user: User = await prismaClient.$transaction((dbClient) => {
        return assignRoles(dbClient, {
          email,
          roles,
          assignedByUser: currentUser,
        })
      })

      sendApiResponse(res, mapUserToDTO(user))
    }),
  )
  .handler()
