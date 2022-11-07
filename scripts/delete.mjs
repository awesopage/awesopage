import { deleteAsync } from 'del'

import { isMainModule, runScript } from './lib/script-runner.mjs'

const deleteScript = async (argv) => {
  await deleteAsync(argv, { force: true })
}

if (isMainModule(import.meta.url)) {
  runScript(deleteScript)
}
