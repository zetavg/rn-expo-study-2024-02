import { useNavigation, usePreventRemove } from '@react-navigation/native';

/**
 * Hook to prevent screen from being closed (removed). Can be used to prevent users from leaving the screen.
 *
 * Currently, this can only prevent screen removal on modal stack navigators. Preventing screen removal on other types of navigators is not supported (iOS native stack did not support preventing screen removal from the JS side).
 */
export function usePreventClose(
  /** A boolean indicating whether to prevent screen from being removed. */
  preventRemove: boolean,
  /** Function which is executed when screen was prevented from being removed. */
  callback?: (
    /** Call this function to confirm that the screen should be closed. */
    confirmClose: () => void,
  ) => void,
  /** A boolean ref to override `preventRemove` while `preventRemove` is `true`. */
  allowRemoveRef?: { current: boolean | undefined | null },
) {
  const navigation = useNavigation();

  usePreventRemove(!!preventRemove, ({ data }) => {
    const confirmClose = () => {
      navigation.dispatch(data.action);
    };

    if (typeof allowRemoveRef === 'object' && allowRemoveRef.current) {
      confirmClose();
      return;
    }

    if (callback) {
      callback(confirmClose);
    }
  });
}

export default usePreventClose;
