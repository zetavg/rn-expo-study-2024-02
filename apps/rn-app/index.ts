import registerRootComponent from 'expo/build/launch/registerRootComponent';

import App from '@/App';

import 'react-native-gesture-handler';

if (process.env.STORYBOOK_MODE /* This will be replaced with babel-plugin-transform-define. See `babel.config.js` for details. */) {
  // Using dynamic require to avoid bundling storybook-related code in production builds while this block will be removed by `babel-plugin-minify-dead-code-elimination`.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  registerRootComponent(require('./.storybook').default);
} else {
  registerRootComponent(App);
}
