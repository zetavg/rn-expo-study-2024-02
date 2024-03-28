import React from 'react';
import { Insets, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { IconName } from '@rnstudy/react-icons';
import { Button as ButtonIOS } from '@rnstudy/react-native-ui-ios';
import { Button as ButtonMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../contexts';

type ButtonStyle = 'plain' | 'outlined' | 'bordered' | 'tinted' | 'prominent';

type ButtonSize = 'small' | 'regular' | 'medium' | 'large';

type ButtonBorderShape = 'automatic' | 'capsule' | 'roundedRectangle';

type Props = {
  label?: string;
  /**
   * Style of the button.
   *
   * Available styles:
   *
   * - `plain`: A plain button with no outline or fill.
   * - `outlined`: A button with an outline. Will fallback to `bordered` on iOS.
   * - `bordered`: A button that has a bordered style.
   * - `tinted`: A button with a tinted background color. Will fallback to `bordered` on Android.
   * - `prominent`: A prominent button, often used for primary actions.
   */
  buttonStyle?: ButtonStyle;
  /**
   * Size of the button.
   *
   * Available sizes:
   *
   * - `small`: A small button. Often used for inline actions.
   * - `regular`: A regular-sized button.
   * - `medium`: A medium-sized button. Often used for the main action(s) in a group or card.
   * - `large`: A large button. Often used for the main action(s) on a screen.
   */
  size?: ButtonSize;
  disabled?: boolean;
  /** Shows a loading indicator on the button. */
  loading?: boolean;
  icon?: IconName;
  buttonBorderShape?: ButtonBorderShape;
  style?: StyleProp<ViewStyle>;
} & {
  /** Shorthand for `buttonStyle="plain"`. */
  plain?: boolean;
  /** Shorthand for `buttonStyle="outlined"`. */
  outlined?: boolean;
  /** Shorthand for `buttonStyle="bordered"`. */
  bordered?: boolean;
  /** Shorthand for `buttonStyle="tinted"`. */
  tinted?: boolean;
  /** Shorthand for `buttonStyle="prominent"`. */
  prominent?: boolean;
} & {
  /** Shorthand for `size="small"`. */
  small?: boolean;
  /** Shorthand for `size="regular"`. */
  regular?: boolean;
  /** Shorthand for `size="medium"`. */
  medium?: boolean;
  /** Shorthand for `size="large"`. */
  large?: boolean;
} & {
  // Re-exposing common PressableProps so that they can be picked-up by react-docgen.
  hitSlop?: Insets;
  onPress?: NonNullable<PressableProps['onPress']>;
  onPressIn?: NonNullable<PressableProps['onPressIn']>;
  onPressOut?: NonNullable<PressableProps['onPressOut']>;
  onLongPress?: NonNullable<PressableProps['onLongPress']>;
} & Omit<
    Partial<{ [K in keyof PressableProps]: NonNullable<PressableProps[K]> }>,
    'children'
  >;

export function Button({
  label,
  buttonStyle: buttonStyleFromProps,
  plain,
  outlined,
  bordered,
  tinted,
  prominent,
  size: sizeFromProps,
  small,
  regular,
  medium,
  large,
  buttonBorderShape,
  // children,
  ...restProps
}: Props) {
  const uiPlatform = useUIPlatform();

  const buttonStyle = (() => {
    if (buttonStyleFromProps) {
      return buttonStyleFromProps;
    }

    if (plain) return 'plain';
    if (outlined) return 'outlined';
    if (bordered) return 'bordered';
    if (tinted) return 'tinted';
    if (prominent) return 'prominent';
  })();
  const size = (() => {
    if (sizeFromProps) {
      return sizeFromProps;
    }

    if (small) return 'small';
    if (regular) return 'regular';
    if (medium) return 'medium';
    if (large) return 'large';
  })();

  switch (uiPlatform) {
    case 'ios': {
      return (
        <ButtonIOS
          label={label}
          buttonStyle={(() => {
            switch (buttonStyle) {
              case 'outlined':
              case 'bordered':
                return 'gray';
              case 'tinted':
                return 'tinted';
              case 'prominent':
                return 'filled';
              case 'plain':
                return 'plain';
              default:
                return undefined;
            }
          })()}
          controlSize={size}
          buttonBorderShape={buttonBorderShape}
          {...restProps}
        />
      );
    }
    case 'android': {
      return (
        <ButtonMD3
          text={label}
          mode={(() => {
            switch (buttonStyle) {
              case 'outlined':
                return 'outlined';
              case 'bordered':
              case 'tinted':
                return 'contained-tonal';
              case 'prominent':
                return 'contained';
              case 'plain':
                return 'text';
              default:
                return undefined;
            }
          })()}
          size={size}
          compact={false}
          loading={false}
          {...restProps}
        />
      );
    }
  }
}

export default Button;
