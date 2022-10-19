const path = require('path')
const fs = require('fs')
const dotenvFlow = require('dotenv-flow')

const { getProfiles } = require('./script-utils')

const configDirPath = path.join(__dirname, '../../config')
const nodeEnv = process.env.NODE_ENV ?? 'development'

const loadEnv = (env) => {
  const profiles = getProfiles()

  const configFilePaths = [
    ...dotenvFlow.listDotenvFiles(configDirPath, { node_env: env }),
    ...profiles.flatMap((profile) => [
      path.join(configDirPath, `.profile.${profile}`),
      path.join(configDirPath, `.profile.${profile}.local`),
    ]),
  ].filter((configFilePath) => fs.existsSync(configFilePath))

  const configFileNames = configFilePaths.map((configFilePath) => path.relative(configDirPath, configFilePath))

  console.log(
    [
      `Loading environment ${env} with profiles [${profiles.join(', ')}]`,
      `from ${configFileNames.length} files [${configFileNames.join(', ')}]...`,
    ].join(' '),
  )

  dotenvFlow.load(configFilePaths, { silent: true })
}

// Use development env for tests
loadEnv(nodeEnv === 'test' ? 'development' : nodeEnv)
