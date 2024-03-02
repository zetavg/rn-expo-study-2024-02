const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { withDangerousMod } = require('@expo/config-plugins');

/**
 * Modifies the iOS project to use un-qualified names for the compiler and linker so that build cache can take effect.
 *
 * @param {import('expo/config').ExpoConfig} config
 * @returns {import('expo/config').ExpoConfig} The modified Expo configuration object.
 */
function withIOSBuildCacheSupport(config) {
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

exports.default = withIOSBuildCacheSupport;
