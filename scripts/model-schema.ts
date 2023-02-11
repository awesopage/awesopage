import './lib/dotenv-loader.js'

import { isMainModule, runScript } from './lib/script-runner.js'
import { runCommand } from './lib/script-utils.js'

const prismaCommand = './node_modules/.bin/prisma'
const prismaArgv = ['--schema=packages/pkg-app-model/schema/app.prisma']

const taskById: Record<string, () => Promise<void>> = {
  migrate: async () => {
    await runCommand(prismaCommand, ['migrate', 'dev', ...prismaArgv])
  },
  reset: async () => {
    await runCommand(prismaCommand, ['migrate', 'reset', ...prismaArgv])
  },
  generate: async () => {
    await runCommand(prismaCommand, ['generate', ...prismaArgv])
  },
}

const modelSchema = async (argv: string[]) => {
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
  runScript(modelSchema)
}