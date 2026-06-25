module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'vue/multi-word-component-names': [
      'error',
      { ignores: ['App', 'Home', 'CButton', 'CIcon', 'CBadge', 'CInput'] },
    ],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/no-unused-vars': 'error',
    'vue/component-api-style': ['error', ['script-setup', 'options']],
  },
  overrides: [
    {
      files: ['src/lib/**/*.{js,vue}'],
      rules: {
        'vue/require-default-prop': 'error',
        'vue/require-explicit-emits': 'error',
      },
    },
  ],
}
