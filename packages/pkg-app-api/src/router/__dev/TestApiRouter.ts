import { NextApiRequest, NextApiResponse } from 'next'

import { createApiRouter, requireProfile } from 'pkg-app-api/src/router/ApiRouter'

export const createTestApiRouter = <
  REQUEST extends NextApiRequest = NextApiRequest,
  RESPONSE extends NextApiResponse = NextApiResponse,
>() => {
  return createApiRouter<REQUEST, RESPONSE>().use(requireProfile('test'))
}
