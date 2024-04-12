import { LayoutAnimation, LayoutAnimationConfig } from 'react-native';

const DEFAULT_LAYOUT_ANIMATION_CONFIG: LayoutAnimationConfig = {
  ...LayoutAnimation.Presets.easeInEaseOut,
  duration: 200,
};

export function configureNextLayoutAnimation(
  config?: Partial<LayoutAnimationConfig>,
) {
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
