const path = require('path')
const fsp = require('fs/promises')

const { runScript } = require('./lib/script-runner')

const handlerByCommand = {
  'create-cache-key': async () => {
    const timestamp = new Date()

    const currentDayOfMonth = timestamp.getDate()
    // Cache on 1st, 4th, 7th dates
    const dayOfMonthToCache = currentDayOfMonth - ((currentDayOfMonth - 1) % 3)

    timestamp.setDate(dayOfMonthToCache)

    const cacheKey = `${timestamp.getFullYear()}-${timestamp.getMonth() + 1}-${timestamp.getDate()}`

    console.log(`Use cache key: ${cacheKey}`)

    await fsp.writeFile(path.join(__dirname, '../workspace-cache-key.txt'), cacheKey)
  },
}

const workspaceScript = async (argv) => {
  const command = argv[0]
  const handler = handlerByCommand[command]

  if (!handler) {
    throw new Error(`Unknown command: ${command}`)
  }

  await handler()
}

if (require.main === module) {
  runScript(workspaceScript)
}
