import './lib/dotenv-loader.mjs'

import wretch from 'wretch'

import { isMainModule, runScript } from './lib/script-runner.mjs'
import { runCommand } from './lib/script-utils.mjs'

const prismaCmd = './node_modules/.bin/prisma'
const prismaArgv = ['--schema=packages/pkg-app-model/schema/app.prisma']

const taskById = {
  'push-accept-data-loss': async () => {
    await runCommand(prismaCmd, ['db', 'push', '--accept-data-loss', '--force-reset', ...prismaArgv])
  },
  migrate: async () => {
    await runCommand(prismaCmd, ['migrate', 'dev', ...prismaArgv])
  },
  generate: async () => {
    await runCommand(prismaCmd, ['generate', ...prismaArgv])
  },
  seed: async () => {
    await wretch(process.env.NEXT_PUBLIC_APP_BASE_URL).post({}, '/api/demo/__dev/data').res()
  },
}

const modelSchemaScript = async (argv) => {
  const taskId = argv[0]
  const task = taskById[taskId]

  if (!task) {
    throw new Error(`Unknown task: ${taskId}`)
  }

  await task()
}

if (isMainModule(import.meta.url)) {
  runScript(modelSchemaScript)
}
