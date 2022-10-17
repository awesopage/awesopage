const path = require('path')
const fsp = require('fs/promises')

const { runScript } = require('./lib/script-runner')

const handlerByCommand = {
  'fix-package-list': async () => {
    // Remove all warning lines from pnpm to ensure that workspace-packages.json contains a JSON array
    const listPath = path.join(__dirname, '../workspace-packages.json')

    const listContent = await fsp.readFile(listPath, 'utf-8')

    const lines = listContent.split(/\r?\n/)

    await fsp.writeFile(listPath, lines.slice(lines.indexOf('[')).join('\n'))
  },
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
