import './lib/dotenv-loader.js'

import fsp from 'node:fs/promises'

import killPort from 'kill-port'
import wretch from 'wretch'

import { delay } from './lib/script-utils.js'

const globalTeardown = async () => {
  if (process.env.COLLECT_COVERAGE) {
    console.log()
    console.log('Collecting api coverage...')
    console.log()

    const coverageJSON = await wretch(process.env.NEXT_PUBLIC_APP_BASE_URL).post({}, '/api/test/__dev/coverage').text()

    const outputDirPath = new URL('../build/test/coverage/', import.meta.url)

    await fsp.mkdir(outputDirPath, { recursive: true })

    await fsp.writeFile(new URL('./next_api_coverage.json', outputDirPath), coverageJSON)

    console.log()
    console.log('Stopping application...')
    console.log()

    await killPort(4800)

    await delay(1)
  }
}

export default globalTeardown
