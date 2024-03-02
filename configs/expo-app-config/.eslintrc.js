/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: ['@rnstudy'],
  env: { node: true },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
  },
};

module.exports = config;
