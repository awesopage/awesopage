const { parserPlugins } = require('@istanbuljs/schema').defaults.nyc

module.exports = {
  parserPlugins: [...parserPlugins, 'typescript', 'jsx'],
  cache: false,
  all: true,
  include: ['packages/pkg-*/src/**'],
  exclude: ['packages/pkg-testing/**', 'packages/pkg-app-shared/**', '**/__dev/**'],
  'temp-dir': process.env.ISTANBUL_TEMP_DIR,
  'report-dir': './tests-report/coverage',
  reporter: ['text-summary', 'html', 'lcov'],
}
