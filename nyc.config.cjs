const { parserPlugins } = require('@istanbuljs/schema').defaults.nyc

module.exports = {
  parserPlugins: [...parserPlugins, 'typescript', 'jsx'],
  cache: false,
  all: true,
  include: ['packages/pkg-*/src/**'],
  exclude: ['packages/pkg-testing/**', 'packages/pkg-app-shared/**', '**/__dev/**'],
  'temp-dir': './build/test/coverage',
  'report-dir': './build/test/reports/coverage',
  reporter: ['text-summary', 'html', 'lcov'],
}
