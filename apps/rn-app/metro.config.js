const { getMetroConfig } = require('@rnstudy/metro-config');

module.exports = (async () => {
  /** @type {import('expo/metro-config').MetroConfig} */
  const config = await getMetroConfig(__dirname);

  return config;
})();
