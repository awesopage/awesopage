const path = require('path')

const spawn = require('cross-spawn')

const getProfiles = () => {
  return process.env.APP_PROFILES ? process.env.APP_PROFILES.split(',') : []
}

const runCommand = async (command, argv, options = {}) => {
  console.log(`Running \`${command} ${argv.join(' ')}\`...`)

  const { waitForExit = true } = options

  if (!waitForExit) {
    const childProcess = createChildProcess(command, argv, options)

    childProcess.unref()

    return
  }

  return new Promise((resolve, reject) => {
    const childProcess = createChildProcess(command, argv, options)

    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} failed with exit code ${code}`))
      }
    })

    childProcess.on('error', reject)
  })
}

const createChildProcess = (command, argv, options) => {
  return spawn(command, argv, {
    cwd: path.join(__dirname, '../../'),
    stdio: [process.stdin, process.stdout, process.stderr],
    env: { ...process.env, ...(options.env ?? {}) },
  })
}

const delay = async (seconds) => {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1_000))
}

const waitFor = async (message, interval, condition) => {
  let isReady = false

  while (!isReady) {
    try {
      isReady = await condition()
    } catch {
      // Do nothing
    }

    if (!isReady) {
      console.log(message)

      await delay(interval)
    }
  }
}

module.exports = { getProfiles, runCommand, delay, waitFor }
