import './lib/dotenv-loader.js'

import wretch from 'wretch'

import { runCommand, waitFor } from './lib/script-utils.js'

const globalSetup = async () => {
  await waitFor('Waiting for application to be ready...', 5, async () => {
    await wretch(process.env.NEXT_PUBLIC_APP_BASE_URL).get('/').res()

    return true
  })

  console.log()
  console.log('Creating demo data...')
  console.log()

  await runCommand('npm', ['run', 'model-schema', 'seed'])
}

export default globalSetup
