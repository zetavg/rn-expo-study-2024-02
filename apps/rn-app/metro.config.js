// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Stops Metro from resolving modules from node_modules in the root workspace if there is a match in the current workspace
config.resolver.disableHierarchicalLookup = true;

const path = require('path');

config.resolver.nodeModulesPaths.push(
  path.resolve(
    __dirname,
    '../../packages/react-native-navigation/node_modules',
  ),
);

module.exports = config;
