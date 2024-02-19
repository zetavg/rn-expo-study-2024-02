import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

import { withDangerousMod } from '@expo/config-plugins';
import type { ConfigContext, ExpoConfig } from 'expo/config';
import JSON5 from 'json5';

const product = JSON5.parse(
  readFileSync(resolve(__dirname, 'product.json5'), 'utf8'),
);

let productConfig = product[process.env.ENVIRONMENT || 'default'];

if (!productConfig) {
  if (process.env.ENVIRONMENT === 'develop') {
    productConfig = product['development'];
  }
}

if (!productConfig) {
  throw new Error(
    `Invalid environment: "${process.env.ENVIRONMENT}". Environment must be one of [${Object.keys(
      product,
    )
      .map((env) => `"${env}"`)
      .join(', ')}] (defined in product.json5).`,
  );
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'rn-app',
  slug: 'rn-app',
  version: config.version || '1.0.0',
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
  ...productConfig,
  ios: {
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
      ...productConfig.ios?.config,
    },
    ...productConfig.ios,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    ...productConfig.android,
  },
  plugins: [withInjectToPodfile],
});

function withInjectToPodfile(config: ExpoConfig) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const filePath = join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = readFileSync(filePath, 'utf-8');

      // Find the `post_install` block and inject code into it
      const postInstallStart = contents.indexOf('post_install do |installer|');
      if (postInstallStart !== -1) {
        // Calculate the insertion point immediately after `post_install do |installer|`
        const insertionPoint = contents.indexOf('\n', postInstallStart) + 1;
        // Insert the code at the calculated insertion point
        contents =
          contents.slice(0, insertionPoint) +
          podfile_post_install +
          '\n' +
          contents.slice(insertionPoint);
      }

      writeFileSync(filePath, contents);
      return config;
    },
  ]);
}

const podfile_post_install = `
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        # Using the un-qualified names means you can swap in different implementations, for example ccache
        config.build_settings["CC"] = "clang"
        config.build_settings["LD"] = "clang"
        config.build_settings["CXX"] = "clang++"
        config.build_settings["LDPLUSPLUS"] = "clang++"
      end
    end
`;
