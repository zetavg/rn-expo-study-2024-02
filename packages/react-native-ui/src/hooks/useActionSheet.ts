import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActionSheet as useActionSheetExpo } from '@expo/react-native-action-sheet';

import { useUIColors as useIOSUIColors } from '@rnstudy/react-native-ui-ios';
import { useColors as useMD3Colors } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../contexts';

type Option = {
  name: string;
  destructive?: boolean;
  onSelect: () => void;
};

export function useActionSheet() {
  const uiPlatform = useUIPlatform();
  const iosUIColors = useIOSUIColors();
  const md3Colors = useMD3Colors();
  const { bottom: safeAreaBottomInset } = useSafeAreaInsets();
  const { showActionSheetWithOptions, ...other } = useActionSheetExpo();

  const showActionSheetWithOptionsWithBottomSafeAreaInsetFix: typeof showActionSheetWithOptions =
    ({ containerStyle, ...options }, handlerFn) => {
      showActionSheetWithOptions(
        {
          ...options,
          containerStyle: {
            paddingBottom: safeAreaBottomInset,
            ...containerStyle,
          },
        },
        handlerFn,
      );
    };

  const showActionSheet = (
    options: readonly Option[],
    {
      title,
      message,
      showCancel = true,
      cancelText = 'Cancel',
      onCancel,
    }: {
      title?: string;
      message?: string;
      showCancel?: boolean;
      cancelText?: string;
      onCancel?: () => void;
    } = {},
  ) => {
    let destructiveButtonIndex: number | undefined = options.findIndex(
      (o) => o.destructive,
    );
    if (destructiveButtonIndex < 0) destructiveButtonIndex = undefined;
    const cancelButtonIndex: number | undefined = showCancel
      ? options.length
      : undefined;

    showActionSheetWithOptionsWithBottomSafeAreaInsetFix(
      {
        title,
        message,
        options: [
          ...options.map((o) => o.name),
          ...(showCancel ? [cancelText] : []),
        ],
        cancelButtonIndex,
        destructiveButtonIndex,
        tintColor:
          uiPlatform === 'ios' ? iosUIColors.tintColor : md3Colors.primary,
      },
      (selectedIndex) => {
        if ((selectedIndex || 0) >= options.length) {
          onCancel && onCancel();
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const option = options[selectedIndex as any];
        option?.onSelect();
      },
    );
  };

  return {
    showActionSheetWithOptions:
      showActionSheetWithOptionsWithBottomSafeAreaInsetFix,
    showActionSheet,
    ...other,
  };
}

export default useActionSheet;
