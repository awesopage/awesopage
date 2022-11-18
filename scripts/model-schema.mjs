import './lib/dotenv-loader.mjs'

import { isMainModule, runScript } from './lib/script-runner.mjs'
import { runCommand } from './lib/script-utils.mjs'

const prismaArgv = ['--schema=packages/pkg-app-model/schema/app.prisma']

const argvByCommand = {
  'push-accept-data-loss': ['db', 'push', '--accept-data-loss', '--force-reset', ...prismaArgv],
  migrate: ['migrate', 'dev', ...prismaArgv],
  generate: ['generate', ...prismaArgv],
}

const modelScript = async (argv) => {
  const command = argv[0]
  const commandArgv = argvByCommand[command]

  if (!commandArgv) {
    throw new Error(`Unknown command: ${command}`)
  }

  await runCommand('./node_modules/.bin/prisma', commandArgv)
}

if (isMainModule(import.meta.url)) {
  runScript(modelScript)
}
