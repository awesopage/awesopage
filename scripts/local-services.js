require('./lib/dotenv-loader')

const axios = require('axios')

const { runScript } = require('./lib/script-runner')
const { runCommand, waitFor } = require('./lib/script-utils')

const composeArgv = ['compose', '-f', 'docker/docker-compose-local.yaml']
const developmentComposeArv = [...composeArgv, '-p', 'ap_local']
const testComposeArgv = [...composeArgv, '-p', 'ap_test']

const argvByCommand = {
  development: {
    start: [...developmentComposeArv, 'up', '--detach'],
    stop: [...developmentComposeArv, 'down'],
    reset: [...developmentComposeArv, 'down', '--volumes'],
    logs: [...developmentComposeArv, 'logs', '--follow', '--tail=50'],
  },
  test: {
    start: [...testComposeArgv, 'up', '--detach'],
    stop: [...testComposeArgv, 'down'],
    reset: [...testComposeArgv, 'down', '--volumes'],
    logs: [...testComposeArgv, 'logs', '--follow', '--tail=50'],
  },
}

const postHookByCommand = {
  start: async () => {
    await waitFor('Waiting for database to be ready...', 5, async () => {
      await axios.get(`http://localhost:${process.env.DATABASE_CONSOLE_PORT ?? 4920}/health`)

      return true
    })

    await runCommand('node', ['scripts/model-schema', 'migrate'])
  },
}

const localServicesScript = async (argv) => {
  const command = argv[0]
  const nodeEnv = process.env.NODE_ENV ?? 'development'
  const commandArgv = argvByCommand[nodeEnv][command]

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
