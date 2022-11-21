import './lib/dotenv-loader.mjs'

import axios from 'axios'

import { isMainModule, runScript } from './lib/script-runner.mjs'
import { getProfiles, runCommand, waitFor } from './lib/script-utils.mjs'

const composeArgv = [
  'compose',
  '-p',
  getProfiles().includes('test') ? 'ap_test' : 'ap_local',
  '-f',
  'docker/docker-compose-local.yaml',
]

const taskById = {
  start: async () => {
    await runCommand('docker', [...composeArgv, 'up', '--detach'])

    await waitFor('Waiting for database to be ready...', 5, async () => {
      await axios.get(`http://localhost:${process.env.DATABASE_CONSOLE_PORT ?? 4920}/health`)

      return true
    })

    const schemaCommand = getProfiles().includes('test') ? 'push-accept-data-loss' : 'migrate'

    await runCommand('node', ['./scripts/model-schema.mjs', schemaCommand])
  },
  stop: async () => {
    await runCommand('docker', [...composeArgv, 'down'])
  },
  reset: async () => {
    await runCommand('docker', [...composeArgv, 'down', '--volumes'])
  },
  logs: async () => {
    await runCommand('docker', [...composeArgv, 'logs', '--follow', '--tail=50'])
  },
}

const localServicesScript = async (argv) => {
  const taskId = argv[0]
  const task = taskById[taskId]

  if (!task) {
    throw new Error(`Unknown task: ${taskId}`)
  }

  await task()
}

if (isMainModule(import.meta.url)) {
  runScript(localServicesScript)
}
