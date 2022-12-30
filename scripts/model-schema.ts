import './lib/dotenv-loader.mjs'

import wretch from 'wretch'

import { isMainModule, runScript } from './lib/script-runner.mjs'
import { runCommand } from './lib/script-utils.mjs'

const prismaCmd = './node_modules/.bin/prisma'
const prismaArgv = ['--schema=packages/pkg-app-model/schema/app.prisma']

const taskById: Record<string, () => Promise<void>> = {
  migrate: async () => {
    await runCommand(prismaCmd, ['migrate', 'dev', ...prismaArgv])
  },
  reset: async () => {
    await runCommand(prismaCmd, ['migrate', 'reset', ...prismaArgv])
  },
  generate: async () => {
    await runCommand(prismaCmd, ['generate', ...prismaArgv])
  },
  seed: async () => {
    await wretch(process.env.NEXT_PUBLIC_APP_BASE_URL).post({}, '/api/demo/__dev/data').res()
  },
}

const modelSchemaScript = async (argv: string[]) => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Should not run this script in production')
  }

  const taskId = argv[0] ?? ''
  const task = taskById[taskId]

  if (!task) {
    throw new Error(`Unknown task: ${taskId}`)
  }

  await task()
}

if (isMainModule(import.meta.url)) {
  runScript(modelSchemaScript)
}
