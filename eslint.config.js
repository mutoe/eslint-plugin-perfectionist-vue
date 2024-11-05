let eslintPlugin = require('eslint-plugin-eslint-plugin/configs/all')

module.exports = [
  eslintPlugin,
  {
    ignores: ['coverage/**/*'],
  },
  {
    rules: {
      'eslint-plugin/require-meta-docs-description': [
        'error',
        { pattern: '^Enforce' },
      ],
      'eslint-plugin/require-meta-docs-recommended': 'off',
      'eslint-plugin/require-meta-docs-url': 'off',
    },
  },
  {
    rules: {
      'perfectionist/sort-objects': 'off',
    },
    files: ['**/test/**', '**/rules/**'],
  },
]
