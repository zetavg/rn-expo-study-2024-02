/** @type{import("@storybook/react-native").StorybookConfig} */
module.exports = {
  stories: [
    '../src/**/*.stories.?(ts|tsx|js|jsx)',
    '../../../packages/react-native-ui/src/**/*.stories.?(ts|tsx|js|jsx)',
    '../../../packages/react-native-ios-ui/src/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};
