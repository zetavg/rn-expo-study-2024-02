import type { ConfigContext, ExpoConfig } from 'expo/config';
import { withPlugins } from 'expo/config-plugins';

import { withDefaultPlugins } from '@rnstudy/expo-app-config';

export default ({ config }: ConfigContext): ExpoConfig =>
  withPlugins(
    {
      ...config,
      name: 'rn-app',
      slug: 'rn-app',
      version: config.version || '0.0.1',
      orientation: 'default',
      userInterfaceStyle: 'automatic',
      icon: './assets/icon.png',
      primaryColor: '#cccccc',
      splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
      assetBundlePatterns: ['**/*'],
      ios: {
        supportsTablet: true,
        config: {
          usesNonExemptEncryption: false,
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#ffffff',
        },
      },
      extra: {
        ...config.extra,
        storybookMode: process.env.STORYBOOK_MODE,
      },
    },
    [
      [
        withDefaultPlugins,
        { dirname: __dirname, environment: process.env.ENVIRONMENT },
      ],
      [
        'expo-build-properties',
        {
          ios: {
            // Header `blurEffect` of react-native-screens (used by @react-navigation/native-stack) is not supported in the new architecture yet.
            // See: https://github.com/software-mansion/react-native-screens/blob/421e22c61243a8c0761c786ccb68c3b209aa1131/ios/RNSScreenStackHeaderConfig.mm#L385-L387
            newArchEnabled: false,
          },
          android: {
            // `@react-navigation/native-stack` isn't working with the new architecture on some Android devices.
            newArchEnabled: false,
          },
        },
      ],
    ],
  );
