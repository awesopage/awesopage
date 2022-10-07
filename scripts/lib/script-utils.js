const path = require('path')

const spawn = require('cross-spawn')

const runCommand = (command, argv) => {
  console.log(`Running \`${command} ${argv.join(' ')}\`...`)

  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, argv, {
      cwd: path.join(__dirname, '../../'),
      stdio: [process.stdin, process.stdout, process.stderr],
    })

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

module.exports = { runCommand, delay, waitFor }
