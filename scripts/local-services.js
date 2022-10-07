const axios = require('axios')

const { runScript } = require('./lib/script-runner')
const { runCommand, waitFor } = require('./lib/script-utils')

const composeArgv = ['compose', '-p', 'ap_local', '-f', 'docker/docker-compose-local.yaml']

const argvByCommand = {
  start: [...composeArgv, 'up', '--detach'],
  stop: [...composeArgv, 'down'],
  reset: [...composeArgv, 'down', '--volumes'],
  logs: [...composeArgv, 'logs', '--follow', '--tail=50'],
}

const postHookByCommand = {
  start: async () => {
    await waitFor('Waiting for database to be ready...', 5, async () => {
      await axios.get('http://localhost:4920/health')

      return true
    })

    await runCommand('node', ['scripts/model-schema', 'migrate'])
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

if (require.main === module) {
  runScript(localServicesScript)
}
