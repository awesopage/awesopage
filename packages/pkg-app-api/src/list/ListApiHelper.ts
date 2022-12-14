import { NextApiRequest } from 'next'

import { assertDefined } from 'pkg-lib-common/src/AssertUtils'
import { getQueryValue } from 'pkg-lib-common/src/QueryUtils'

export interface ListOwnerRepo {
  readonly owner: string
  readonly repo: string
}

export const requireListOwnerAndRepo = (req: NextApiRequest): ListOwnerRepo => {
  const owner = getQueryValue(req.query.owner)
  const repo = getQueryValue(req.query.repo)

  assertDefined(owner, 'owner')
  assertDefined(repo, 'repo')

  return { owner, repo }
}
