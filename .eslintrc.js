/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: ['@rnstudy'],
  ignorePatterns: ['!.yarn'],
  env: { node: true },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
  },
};

module.exports = config;
