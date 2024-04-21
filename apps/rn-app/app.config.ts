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
        softwareKeyboardLayoutMode: 'pan',
      },
      extra: {
        ...config.extra,
      },
    },
    [
      [
        withDefaultPlugins,
        { dirname: __dirname, environment: process.env.ENVIRONMENT },
      ],
      [
        'expo-screen-orientation',
        {
          initialOrientation: 'PORTRAIT',
        },
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
      [
        'expo-font',
        {
          fonts: [
            '../../assets/fonts/Roboto/Roboto-Thin.ttf',
            '../../assets/fonts/Roboto/Roboto-ThinItalic.ttf',
            '../../assets/fonts/Roboto/Roboto-Light.ttf',
            '../../assets/fonts/Roboto/Roboto-LightItalic.ttf',
            '../../assets/fonts/Roboto/Roboto-Regular.ttf',
            '../../assets/fonts/Roboto/Roboto-Italic.ttf',
            '../../assets/fonts/Roboto/Roboto-Medium.ttf',
            '../../assets/fonts/Roboto/Roboto-MediumItalic.ttf',
            '../../assets/fonts/Roboto/Roboto-Bold.ttf',
            '../../assets/fonts/Roboto/Roboto-BoldItalic.ttf',
            '../../assets/fonts/Roboto/Roboto-Black.ttf',
            '../../assets/fonts/Roboto/Roboto-BlackItalic.ttf',
          ],
        },
      ],
    ],
  );
