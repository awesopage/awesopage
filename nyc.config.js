module.exports = {
  all: true,
  include: ['packages/pkg-*/src/**'],
  'temp-dir': process.env.ISTANBUL_TEMP_DIR,
  'report-dir': './tests-report/coverage',
  reporter: ['text-summary', 'html', 'lcov'],
}
