import { useNavigation, usePreventRemove } from '@react-navigation/native';

/**
 * Hook to prevent screen from being closed (removed). Can be used to prevent users from leaving the screen.
 *
 * Currently, this can only prevent screen removal on modal stack navigators. Preventing screen removal on other types of navigators is not supported (iOS native stack did not support preventing screen removal from the JS side).
 */
export function usePreventClose(
  /** A boolean or boolean ref indicating whether to prevent screen from being removed. */
  preventRemove: boolean | { current: boolean | undefined | null },
  /** Function which is executed when screen was prevented from being removed. */
  callback?: (
    /** Call this function to confirm that the screen should be closed. */
    confirmClose: () => void,
  ) => void,
) {
  const navigation = useNavigation();

  usePreventRemove(!!preventRemove, ({ data }) => {
    const confirmClose = () => {
      navigation.dispatch(data.action);
    };

    if (typeof preventRemove === 'object' && !preventRemove.current) {
      confirmClose();
      return;
    }

    if (callback) {
      callback(confirmClose);
    }
  });
}

export default usePreventClose;
