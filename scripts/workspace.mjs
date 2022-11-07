import fsp from 'node:fs/promises'

import { isMainModule, runScript } from './lib/script-runner.mjs'

const handlerByCommand = {
  'fix-package-list': async () => {
    // Remove logs from pnpm to ensure that workspace-packages.json contains a JSON array
    const listPath = new URL('../workspace-packages.json', import.meta.url)

    const listContent = await fsp.readFile(listPath, 'utf-8')

    const listLines = listContent.split(/\r?\n/)

    await fsp.writeFile(listPath, listLines.slice(listLines.indexOf('[')).join('\n'))
  },
  'create-cache-key': async () => {
    const timestamp = new Date()

    const currentDayOfMonth = timestamp.getDate()
    // Cache on 1st, 4th, 7th dates
    const dayOfMonthToCache = currentDayOfMonth - ((currentDayOfMonth - 1) % 3)

    timestamp.setDate(dayOfMonthToCache)

    const cacheKey = `${timestamp.getFullYear()}-${timestamp.getMonth() + 1}-${timestamp.getDate()}`

    console.log(`Use cache key: ${cacheKey}`)

    await fsp.writeFile(new URL('../workspace-cache-key.txt', import.meta.url), cacheKey)
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

if (isMainModule(import.meta.url)) {
  runScript(workspaceScript)
}
