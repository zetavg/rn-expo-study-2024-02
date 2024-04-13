import type { UIPlatform } from '@rnstudy/react-native-ui';

export type ControlsState = {
  uiPlatform: UIPlatform;
  colorScheme: 'light' | 'dark';
  background: 'default' | 'transparent' | 'system' | 'grouped';
  elevated: undefined | boolean;
  showSpecOverlay?: boolean;
  showBoundaryLines?: boolean;
};
