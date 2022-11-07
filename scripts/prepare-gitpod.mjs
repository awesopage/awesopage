import fs from 'node:fs'
import fsp from 'node:fs/promises'

import cpy from 'cpy'

import { isMainModule, runScript } from './lib/script-runner.mjs'

const replaceEnv = (envLines, key, value) => {
  const newEnvLine = `${key}=${value}`
  const index = envLines.findIndex((envLine) => envLine.includes(key))

  if (index === -1) {
    envLines.push(newEnvLine)
  } else {
    envLines[index] = newEnvLine
  }
}

const setGitpodEnv = async (envPath) => {
  const envContent = fs.existsSync(envPath) ? await fsp.readFile(envPath, 'utf-8') : ''

  const envLines = envContent.split(/\r?\n/)

  const gitpodUrlSuffix = `${process.env.GITPOD_WORKSPACE_ID}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`
  replaceEnv(envLines, 'NEXT_PUBLIC_APP_BASE_URL', `https://4000-${gitpodUrlSuffix}`)

  await fsp.writeFile(envPath, envLines.join('\n'))
}

const prepareGitpodScript = async () => {
  await cpy('.gitpod/vscode-settings.json', '.vscode', { flat: true, rename: 'settings.json' })
  await cpy('config/.env.development', 'config', { flat: true, rename: '.env.production.local' })

  await setGitpodEnv(new URL('../config/.env.development.local', import.meta.url))
  await setGitpodEnv(new URL('../config/.env.production.local', import.meta.url))
}

if (isMainModule(import.meta.url)) {
  runScript(prepareGitpodScript)
}
