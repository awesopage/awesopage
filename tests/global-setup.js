require('../scripts/lib/dotenv-loader')

const axios = require('axios')

const { runCommand, waitFor } = require('../scripts/lib/script-utils')

const globalSetup = async () => {
  if (process.env.START_APP) {
    console.log()
    console.log('Starting test services...')
    console.log()

    await runCommand('node', ['scripts/local-services', 'start'])

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
}

export default globalSetup
