import jsonStringify from 'safe-stable-stringify'

export class ApplicationError<T> extends Error {
  constructor(public details: T) {
    super(jsonStringify(details))

    Error.captureStackTrace(this, ApplicationError)
  }
}
