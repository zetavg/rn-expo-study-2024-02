/** @type{import("@storybook/react-native").StorybookConfig} */
module.exports = {
  stories: [
    '../src/**/*.stories.?(ts|tsx|js|jsx)',
    '../../../packages/react-native-ui/src/**/*.stories.?(ts|tsx|js|jsx)',
    '../../../packages/react-native-ui-ios/src/**/*.stories.?(ts|tsx|js|jsx)',
    '../../../packages/react-native-ui-md3/src/**/*.stories.?(ts|tsx|js|jsx)',
    '../../../packages/react-native-navigation/src/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};
