const { runCommand } = require('../scripts/lib/script-utils')

module.exports = async () => {
  console.log()
  console.log('Setting up test services..')
  console.log()

  await runCommand('node', ['scripts/local-services', 'start'])
}
