module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-len': [
      'error',
      {
        code: 80,
        template: 80,
        ignorePattern: 'd=([sS]*?)'
      }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
