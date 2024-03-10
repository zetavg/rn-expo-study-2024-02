module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    overrides: [
      {
        exclude: ['node_modules/*'],
        plugins: ['react-docgen'],
      },
    ],
  };
};
