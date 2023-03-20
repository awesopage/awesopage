import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

import type { APIRequestContext } from '@playwright/test'
import { expect as baseExpect, test as baseTest } from 'playwright-test-coverage'
import wretch from 'wretch'

import type { ApiConfig } from 'pkg-app-shared/src/common/ApiConfig'
import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'

export const expect = baseExpect

export const resetTestData = async () => {
  await wretch(process.env.INTERNAL_APP_BASE_URL).post({}, '/api/__test/data/reset').res()
}

type CustomFixtures = Readonly<{
  testData: void
}>

export const test = baseTest.extend<CustomFixtures>({
  testData: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use, testInfo) => {
      assertDefined(process.env.LOCAL_WORKSPACE_PATH, 'LOCAL_WORKSPACE_PATH')
      assertDefined(process.env.DATABASE_OPERATION_LOG_PATH, 'DATABASE_OPERATION_LOG_PATH')
      assertDefined(process.env.TEST_DATA_LOG_PATH, 'TEST_DATA_LOG_PATH')

      const operationLogPath = path.join(process.env.LOCAL_WORKSPACE_PATH, process.env.DATABASE_OPERATION_LOG_PATH)
      const operations = fs.existsSync(operationLogPath)
        ? (await fsp.readFile(operationLogPath, 'utf-8')).split(/\r?\n/).filter(Boolean)
        : []

      const writeOperationCount = operations.filter((operation) => getOperationType(operation) === 'write').length
      const readOperationCount = operations.length - writeOperationCount
      const isDatabaseDirty = !!writeOperationCount

      if (isDatabaseDirty) {
        await resetTestData()
      }

      const testDataLogPath = path.join(process.env.LOCAL_WORKSPACE_PATH, process.env.TEST_DATA_LOG_PATH)
      const operationSummary = `${readOperationCount} reads, ${writeOperationCount} writes`
      const testName = testInfo.titlePath.slice(1).join(' > ')
      const message = [
        ...operations.map((operation) => `${operation} => ${getOperationType(operation)}`),
        '',
        `${operationSummary} => ${isDatabaseDirty ? 'reset' : 'reuse'} => ${testName}`,
        '',
      ].join('\n')

      await fsp.appendFile(testDataLogPath, message)

      if (fs.existsSync(operationLogPath)) {
        await fsp.rm(operationLogPath)
      }

      await use()
    },
    { auto: true },
  ],
})

const DB_OPERATION_PREFIXES_BY_TYPE = {
  read: ['find', 'count', 'group', 'aggregate', '$queryRaw'],
  write: ['create', 'update', 'delete', 'upsert', '$executeRaw'],
}

type DB_OPERATION_TYPE = keyof typeof DB_OPERATION_PREFIXES_BY_TYPE

const getOperationType = (operation: string): DB_OPERATION_TYPE => {
  const operationTypes = Object.keys(DB_OPERATION_PREFIXES_BY_TYPE) as DB_OPERATION_TYPE[]

  const operationType = operationTypes.find((operationType) => {
    return DB_OPERATION_PREFIXES_BY_TYPE[operationType].some((prefix) => operation.includes(`.${prefix}`))
  })

  if (!operationType) {
    throw new Error(`Cannot get type of operation ${operation}`)
  }

  return operationType
}

export type TestApiResponse<T> = Readonly<{
  url: () => string
  ok: () => boolean
  json: () => Promise<T>
}>

export const createTestApiRequest = <T, P>(apiConfig: ApiConfig<T, P>) => {
  return async (request: APIRequestContext, params: P): Promise<TestApiResponse<T>> => {
    const path = apiConfig.getPath(params)

    const response = await request[apiConfig.method](path, {
      ...(apiConfig.method === 'get' ? {} : { data: params }),
    })

    return {
      url: () => response.url(),
      ok: () => response.ok(),
      json: () => response.json(),
    }
  }
}
