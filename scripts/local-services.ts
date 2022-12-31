import './lib/dotenv-loader.js'

import wretch from 'wretch'

import { isMainModule, runScript } from './lib/script-runner.js'
import { getProfiles, runCommand, waitFor } from './lib/script-utils.js'

const dockerCmd = 'docker'
const composeArgv = [
  'compose',
  '-p',
  getProfiles().includes('test') ? 'ap_test' : 'ap_local',
  '-f',
  'docker/docker-compose-local.yaml',
]

const taskById: Record<string, () => Promise<void>> = {
  start: async () => {
    await runCommand(dockerCmd, [...composeArgv, 'up', '--detach'])

    await waitFor('Waiting for database to be ready...', 5, async () => {
      await wretch(`http://localhost:${process.env.DATABASE_CONSOLE_PORT ?? 4920}`)
        .get('/health')
        .res()

      return true
    })

    await runCommand('npm', ['run', 'model-schema', 'migrate'])
  },
  stop: async () => {
    await runCommand(dockerCmd, [...composeArgv, 'down'])
  },
  reset: async () => {
    await runCommand(dockerCmd, [...composeArgv, 'down', '--volumes'])
  },
  logs: async () => {
    await runCommand(dockerCmd, [...composeArgv, 'logs', '--follow', '--tail=50'])
  },
}

const localServicesScript = async (argv: string[]) => {
  const taskId = argv[0] ?? ''
  const task = taskById[taskId]

  if (!task) {
    throw new Error(`Unknown task: ${taskId}`)
  }

  await task()
}

if (isMainModule(import.meta.url)) {
  runScript(localServicesScript)
}
