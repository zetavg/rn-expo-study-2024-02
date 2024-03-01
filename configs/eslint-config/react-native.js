const base = require('./index');

/** @type {import('eslint').Linter.Config} */
const config = {
  ...base,
  extends: [...base.extends, 'universe/native', '@react-native-community'],
  rules: {
    ...base.rules,
    'import/order': 'off', // we use `simple-import-sort/imports` instead
  },
};

module.exports = config;
