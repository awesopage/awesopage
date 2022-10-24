module.exports = {
  all: true,
  include: ['packages/pkg-*/src/**'],
  exclude: ['packages/pkg-testing/**'],
  'temp-dir': process.env.ISTANBUL_TEMP_DIR,
  'report-dir': './tests-report/coverage',
  reporter: ['text-summary', 'html', 'lcov'],
}
