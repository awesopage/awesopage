module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['file-progress', 'sonarjs', 'no-null', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  globals: {
    globalThis: 'readonly',
  },
  rules: {
    'file-progress/activate': 1,
    '@typescript-eslint/no-type-alias': [
      'error',
      {
        allowAliases: 'always',
        allowCallbacks: 'always',
        allowConditionalTypes: 'always',
        allowMappedTypes: 'always',
        allowTupleTypes: 'always',
      },
    ],
    'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
    'sonarjs/prefer-immediate-return': 'off',
    'sonarjs/cognitive-complexity': ['error', 10],
    'no-null/no-null': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // side effect imports
          ['^\\u0000'],
          // core imports
          ['^node:'],
          // external imports
          ['^'],
          // internal imports
          ['^pkg-'],
          // relative imports (should manually fix them to internal imports)
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'react/display-name': 'off',
  },
  overrides: [
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'max-lines-per-function': ['error', { max: 60, skipBlankLines: true, skipComments: true }],
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'max-lines-per-function': 'off',
      },
    },
  ],
}
