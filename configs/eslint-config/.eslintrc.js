const config = require('./index');

module.exports = {
  ...config,
  env: { node: true },
  rules: {
    ...config.rules,
    '@typescript-eslint/no-var-requires': 'off',
  },
};
