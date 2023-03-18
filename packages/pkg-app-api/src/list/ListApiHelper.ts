import type { NextApiRequest } from 'next'

import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import { getQueryValue } from 'pkg-app-shared/src/common/QueryUtils'
import type { ListKeyDTO } from 'pkg-app-shared/src/list/ListKeyDTO'

export const requireListKey = (req: NextApiRequest): ListKeyDTO => {
  const owner = getQueryValue(req.query.owner)
  const repo = getQueryValue(req.query.repo)

  assertDefined(owner, 'owner')
  assertDefined(repo, 'repo')

  return { owner, repo }
}
