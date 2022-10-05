const del = require('del')

const { runScript } = require('./lib/script-runner')

const deleteScript = async (argv) => {
  await del(argv, { force: true })
}

if (require.main === module) {
  runScript(deleteScript)
}
