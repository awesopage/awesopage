import { PrismaClient } from 'pkg-app-model/client'
import { PrismaClientOptions } from 'pkg-app-model/client/runtime'
import { createLogger } from 'pkg-app-service/src/common/LoggingUtils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalThisAny = globalThis as any

const logger = createLogger('PrismaClient')

const getLogOptions = (): PrismaClientOptions['log'] => {
  const queryLogOptions: PrismaClientOptions['log'] =
    process.env.DATABASE_QUERY_DEBUG === 'true'
      ? [
          {
            emit: 'event',
            level: 'query',
          },
        ]
      : []

  return [
    ...queryLogOptions,
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
    {
      emit: 'event',
      level: 'error',
    },
  ]
}

const createPrismaClient = () => {
  const databaseUrl = process.env.DATABASE_URL

  const client: PrismaClient<PrismaClientOptions, 'info' | 'warn' | 'error' | 'query'> = new PrismaClient({
    datasources: {
      ...(databaseUrl ? { db: { url: databaseUrl } } : {}),
    },
    log: getLogOptions(),
  })

  client.$on('query', (queryEvent) => {
    const params = queryEvent.params.substring(0, 500)

    logger.debug(`Query ${queryEvent.query} with params << ${params} >> took ${queryEvent.duration}ms.`)
  })
  client.$on('info', (logEvent) => {
    logger.info(logEvent.message)
  })
  client.$on('warn', (logEvent) => {
    logger.warn(logEvent.message)
  })
  client.$on('error', (logEvent) => {
    logger.error(logEvent.message)
  })

  return client
}

let prismaClient: PrismaClient

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
if (process.env.NODE_ENV === 'production') {
  prismaClient = createPrismaClient()
} else {
  prismaClient = globalThisAny.sharedPrismaClient ?? (globalThisAny.sharedPrismaClient = createPrismaClient())
}

export { prismaClient }
