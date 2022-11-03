require('../../scripts/lib/dotenv-loader')

const path = require('path')
const fsp = require('fs/promises')

const axios = require('axios')
const killPort = require('kill-port')

const { delay } = require('../../scripts/lib/script-utils')

const globalTeardown = async () => {
  if (process.env.START_APP) {
    if (process.env.COLLECT_COVERAGE) {
      console.log()
      console.log('Collecting api coverage...')
      console.log()

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/test/__dev/coverage`)

      await fsp.writeFile(
        path.join(__dirname, '../../test-output/build/nyc/next_api_coverage.json'),
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
