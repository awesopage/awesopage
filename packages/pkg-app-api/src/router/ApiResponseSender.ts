import { NextApiResponse } from 'next'

import { mapErrorToString } from 'pkg-app-api/src/common/MapperUtils'
import { createLogger } from 'pkg-app-service/src/common/LoggingUtils'
import { ApplicationError } from 'pkg-app-service/src/error/ApplicationError'
import { ApiErrorDTO, ApiErrorType } from 'pkg-app-shared/src/error/ApiErrorDTO'

const logger = createLogger('ApiResponseSender')

const STATUS_CODE_BY_ERROR_TYPE: Partial<Record<ApiErrorType, number>> = {
  UNAUTHORIZED: 401,
  ACCESS_DENIED: 403,
  ROUTE_HANDLER_NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export const sendApiError = (res: NextApiResponse, type: ApiErrorType, err?: Error) => {
  const debugInfo = err && mapErrorToString(err)

  if (err) {
    logger.error(`${type}: ${debugInfo}`)
  }

  const statusCode = STATUS_CODE_BY_ERROR_TYPE[type] ?? 500

  const apiError: ApiErrorDTO = {
    type,
    details: err instanceof ApplicationError ? err.details : undefined,
    debugInfo: process.env.NODE_ENV !== 'production' && err ? debugInfo : undefined,
  }

  res.status(statusCode).json(apiError)
}

export const sendApiResponse = <T>(res: NextApiResponse<T>, data: T) => {
  res.status(200).json(data)
}
