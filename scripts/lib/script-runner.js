const runScript = (script) => {
  script(process.argv.slice(2)).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

module.exports = { runScript }
