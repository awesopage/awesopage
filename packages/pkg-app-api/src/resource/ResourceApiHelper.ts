import type { NextApiRequest } from 'next'

import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import { getQueryValue } from 'pkg-app-shared/src/common/QueryUtils'

export const requireResourceId = (req: NextApiRequest): bigint => {
  const resourceId = getQueryValue(req.query.resourceId)

  assertDefined(resourceId, 'resourceId')

  return BigInt(resourceId)
}
