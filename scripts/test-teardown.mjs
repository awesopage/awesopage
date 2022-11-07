import './lib/dotenv-loader.mjs'

import fsp from 'node:fs/promises'

import axios from 'axios'
import killPort from 'kill-port'

import { delay } from './lib/script-utils.mjs'

const globalTeardown = async () => {
  if (process.env.START_APP) {
    if (process.env.COLLECT_COVERAGE) {
      console.log()
      console.log('Collecting api coverage...')
      console.log()

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/test/__dev/coverage`)

      await fsp.writeFile(
        new URL('../build/test/coverage/next_api_coverage.json', import.meta.url),
        JSON.stringify(data),
      )
    }

    console.log()
    console.log('Stopping application...')
    console.log()

    await killPort(4800)

    await delay(1)
  }
}

export default globalTeardown
