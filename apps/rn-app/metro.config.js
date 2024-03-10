const { getMetroConfig } = require('@rnstudy/metro-config');

module.exports = (async () => {
  /** @type {import('expo/metro-config').MetroConfig} */
  const config = await getMetroConfig(__dirname);

  if (process.env.STORYBOOK_MODE) {
    config.cacheVersion = 'storybook';
  }

  return config;
})();
