import 'scripts/lib/dotenv-loader.js'

import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

import { request } from '@playwright/test'

import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import { runCommand } from 'scripts/lib/script-utils'
import { testUsers } from 'tests/data/TestUserData'

const collectAuthStates = async () => {
  console.log()
  console.log(`Collecting auth states for ${testUsers.length} users...`)
  console.log()

  for (const testUser of testUsers) {
    const requestContext = await request.newContext()

    await requestContext.post(`${process.env.INTERNAL_APP_BASE_URL}/api/__test/auth`, {
      data: { email: testUser.email },
    })

    await requestContext.storageState({
      path: `output/test/playwright/setup/${testUser.email.split('@')[0]}-auth-state.json`,
    })
    await requestContext.dispose()
  }
}

const globalSetup = async () => {
  assertDefined(process.env.LOCAL_WORKSPACE_PATH, 'LOCAL_WORKSPACE_PATH')
  assertDefined(process.env.DATABASE_OPERATION_LOG_PATH, 'DATABASE_OPERATION_LOG_PATH')
  assertDefined(process.env.TEST_DATA_LOG_PATH, 'TEST_DATA_LOG_PATH')

  const operationLogPath = path.join(process.env.LOCAL_WORKSPACE_PATH, process.env.DATABASE_OPERATION_LOG_PATH)
  const testDataLogPath = path.join(process.env.LOCAL_WORKSPACE_PATH, process.env.TEST_DATA_LOG_PATH)

  await fsp.mkdir(path.dirname(operationLogPath), { recursive: true })
  await fsp.mkdir(path.dirname(testDataLogPath), { recursive: true })

  console.log()
  console.log('Creating test data...')
  console.log()

  await runCommand('npm', ['run', 'seed'])

  await collectAuthStates()

  if (fs.existsSync(operationLogPath)) {
    await fsp.rm(operationLogPath)
  }
}

export default globalSetup
