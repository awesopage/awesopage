require('./lib/dotenv-loader')

const { runScript } = require('./lib/script-runner')
const { runCommand } = require('./lib/script-utils')

const prismaArgv = ['--schema=packages/pkg-app-model/schema/app.prisma']

const argvByCommand = {
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

if (require.main === module) {
  runScript(modelScript)
}
