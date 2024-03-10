module.exports = function (api) {
  api.cache.using(() => (process.env.STORYBOOK_MODE ? 'storybook' : 'main'));

  return {
    presets: ['babel-preset-expo'],
    overrides: [
      {
        exclude: ['node_modules/*'],
        plugins: [
          ['react-docgen'],
          [
            'transform-define',
            {
              'process.env.STORYBOOK_MODE': !!process.env.STORYBOOK_MODE,
            }, // Note: Metro bundle cache is addressed by using a different `cacheVersion` config while these values are changed. See `metro.config.js` for more details.
          ],
          ['babel-plugin-minify-dead-code-elimination'],
        ],
      },
    ],
  };
};
