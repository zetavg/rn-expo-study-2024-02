import { useBackgroundColor as useBackgroundColorIOS } from '@rnstudy/react-native-ui-ios';
import { useBackgroundColor as useBackgroundColorMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../contexts';

/**
 * Returns the color that can be used as a view or container's background.
 *
 * In most cases, consider using the `BackgroundColor` component instead of this hook, as it will handle background colors automatically with the context.
 */
export function useBackgroundColor(conditions: {
  /**
   * Whether we should use the *grouped* background colors.
   *
   * If you are specifying this to set the background color of a view, be sure to wrap the children in a `IsGroupedBackgroundContext.Provider` so that the children components will be able to use the correct set of background colors.
   */
  grouped: boolean | undefined;
  /**
   * The level of the background color.
   */
  level?: number;

  elevated?: boolean;
}): string {
  const uiPlatform = useUIPlatform();

  const iosBackgroundColor = useBackgroundColorIOS(conditions);
  const md3BackgroundColor = useBackgroundColorMD3(conditions);

  switch (uiPlatform) {
    case 'ios':
      return iosBackgroundColor;
    case 'android':
      return md3BackgroundColor;
  }
}

export default useBackgroundColor;
