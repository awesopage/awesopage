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

const argvByCommand = {
  start: [...composeArgv, 'up', '--detach'],
  stop: [...composeArgv, 'down'],
  reset: [...composeArgv, 'down', '--volumes'],
  logs: [...composeArgv, 'logs', '--follow', '--tail=50'],
}

const postHookByCommand = {
  start: async () => {
    await waitFor('Waiting for database to be ready...', 5, async () => {
      await axios.get(`http://localhost:${process.env.DATABASE_CONSOLE_PORT ?? 4920}/health`)

      return true
    })

    const schemaCommand = getProfiles().includes('test') ? 'push-accept-data-loss' : 'migrate'

    await runCommand('node', ['scripts/model-schema.mjs', schemaCommand])
  },
}

const localServicesScript = async (argv) => {
  const command = argv[0]
  const commandArgv = argvByCommand[command]

  if (!commandArgv) {
    throw new Error(`Unknown command: ${command}`)
  }

  await runCommand('docker', commandArgv)

  const postHook = postHookByCommand[command]

  if (postHook) {
    console.log(`Running \`${command}\` post hook...`)

    await postHook()
  }
}

if (isMainModule(import.meta.url)) {
  runScript(localServicesScript)
}
