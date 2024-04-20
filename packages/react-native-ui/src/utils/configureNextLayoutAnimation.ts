import { LayoutAnimation, LayoutAnimationConfig, Platform } from 'react-native';

const DEFAULT_LAYOUT_ANIMATION_CONFIG: LayoutAnimationConfig = {
  ...LayoutAnimation.Presets.easeInEaseOut,
  duration: 200,
};

export function configureNextLayoutAnimation(
  config?: Partial<LayoutAnimationConfig> & {
    onlyOnNativePlatforms?: readonly (typeof Platform.OS)[];
  },
) {
  if (config?.onlyOnNativePlatforms) {
    if (!config?.onlyOnNativePlatforms.includes(Platform.OS)) {
      return;
    }
  }

  LayoutAnimation.configureNext(
    config
      ? {
          ...DEFAULT_LAYOUT_ANIMATION_CONFIG,
          ...config,
        }
      : DEFAULT_LAYOUT_ANIMATION_CONFIG,
  );
}

export default configureNextLayoutAnimation;
