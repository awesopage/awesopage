const path = require('path')
const fs = require('fs')
const dotenvFlow = require('dotenv-flow')

const configPath = path.join(__dirname, '../../config')
const nodeEnv = process.env.NODE_ENV ?? 'development'

const loadEnvs = (envs) => {
  const filePaths = envs
    .flatMap((env) => dotenvFlow.listDotenvFiles(configPath, { node_env: env }))
    .filter((filePath) => fs.existsSync(filePath))

  dotenvFlow.load(filePaths, { silent: true })
}

// Merge development env for test
loadEnvs(nodeEnv === 'test' ? ['development', 'test'] : [nodeEnv])
