import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier', 'plugin:import/recommended'],
    rules: {
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js built-ins
            'external', // Third-party modules
            'internal', // Internal modules (e.g., `@/utils`)
            ['parent', 'sibling', 'index'] // Relative imports
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ]
    }
  })
]

export default eslintConfig
