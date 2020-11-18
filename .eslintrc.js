module.exports = {
  env: {
    mocha: true,
    commonjs: true,
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  ignorePatterns: ['/public'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-trailing-spaces': 'warn'
  }
};
