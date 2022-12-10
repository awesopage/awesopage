import './lib/dotenv-loader.mjs'

import fsp from 'node:fs/promises'

import killPort from 'kill-port'
import wretch from 'wretch'

import { delay } from './lib/script-utils.mjs'

const globalTeardown = async () => {
  if (process.env.START_APP) {
    if (process.env.COLLECT_COVERAGE) {
      console.log()
      console.log('Collecting api coverage...')
      console.log()

      const coverageJSON = await wretch(process.env.NEXT_PUBLIC_APP_BASE_URL)
        .post({}, '/api/test/__dev/coverage')
        .text()

      await fsp.writeFile(new URL('../build/test/coverage/next_api_coverage.json', import.meta.url), coverageJSON)
    }

    console.log()
    console.log('Stopping application...')
    console.log()

    await killPort(4800)

    await delay(1)
  }
}

export default globalTeardown
