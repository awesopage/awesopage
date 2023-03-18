import 'scripts/lib/dotenv-loader.js'

import fsp from 'node:fs/promises'
import path from 'node:path'

import killPort from 'kill-port'
import wretch from 'wretch'

import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import { delay } from 'scripts/lib/script-utils'

const globalTeardown = async () => {
  console.log()
  console.log('Collecting api coverage...')
  console.log()

  const apiCoverageJSON = await wretch(process.env.INTERNAL_APP_BASE_URL).post({}, '/api/__test/coverage').text()

  assertDefined(process.env.LOCAL_WORKSPACE_PATH, 'LOCAL_WORKSPACE_PATH')

  const apiCoveragePath = path.join(process.env.LOCAL_WORKSPACE_PATH, 'output/test/coverage/tmp/api_coverage.json')
  await fsp.mkdir(path.dirname(apiCoveragePath), { recursive: true })
  await fsp.writeFile(apiCoveragePath, apiCoverageJSON)

  if (process.env.STOP_APP_ON_EXIT) {
    console.log()
    console.log('Stopping application...')
    console.log()

    await killPort(4800)
  }

  // Delay a short time for Istanbul to finish processing
  await delay(1)
}

export default globalTeardown
