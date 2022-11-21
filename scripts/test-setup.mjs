import './lib/dotenv-loader.mjs'

import axios from 'axios'

import { runCommand, waitFor } from './lib/script-utils.mjs'

const globalSetup = async () => {
  if (process.env.START_APP) {
    console.log()
    console.log('Starting test services...')
    console.log()

    await runCommand('node', ['./scripts/local-services.mjs', 'start'])

    console.log()
    console.log('Starting application...')
    console.log()

    if (process.env.COLLECT_COVERAGE) {
      await runCommand('./node_modules/.bin/nyc', ['next', 'dev', '-p', '4800'], {
        waitForExit: false,
      })
    } else {
      await runCommand('./node_modules/.bin/next', ['dev', '-p', '4800'], {
        waitForExit: false,
      })
    }

    await waitFor('Waiting for application to be ready...', 5, async () => {
      await axios.get(process.env.NEXT_PUBLIC_APP_BASE_URL)

      return true
    })
  }

  console.log()
  console.log('Creating demo data...')
  console.log()

  await runCommand('node', ['./scripts/model-schema.mjs', 'seed'])
}

export default globalSetup
