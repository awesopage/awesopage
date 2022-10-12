const { runCommand } = require('../scripts/lib/script-utils')

module.exports = async () => {
  console.log()
  console.log('Running integration setup...')
  console.log()

  await runCommand('node', ['scripts/local-services', 'start', 'test'])

  await runCommand('node', ['scripts/model-schema', 'migrate'])
}
