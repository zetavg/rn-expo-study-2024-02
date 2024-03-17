import React from 'react';
import { StyleSheet, Text as NativeText, View } from 'react-native';
import { ActivityIndicator, Button as RNButton } from 'react-native-paper';

import { Icon, IconName } from '@rnstudy/react-icons';

import { useTheme } from '../../contexts';

type Props = {
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  size?: 'small' | 'regular' | 'medium' | 'large';
  text?: string;
  icon?: IconName;
  loading?: boolean;
} & {
  // Re-exposing common PressableProps so that they can be picked-up by react-docgen.
  disabled?: boolean;
  onPress?: React.ComponentProps<typeof RNButton>['onPress'];
  onPressIn?: React.ComponentProps<typeof RNButton>['onPressIn'];
  onPressOut?: React.ComponentProps<typeof RNButton>['onPressOut'];
  onLongPress?: React.ComponentProps<typeof RNButton>['onLongPress'];
} & Omit<Partial<React.ComponentProps<typeof RNButton>>, 'icon' | 'children'>;

export function Button({
  mode = 'text',
  size = 'regular',
  text,
  icon,
  loading,
  style,
  ...restProps
}: Props) {
  const theme = useTheme();

  return (
    <RNButton
      {...restProps}
      mode={mode}
      style={[
        styles.container,
        // If there is no text (indicating it's an icon button), reset the minWidth to make it resemble a circle.
        !text &&
          (() => {
            switch (size) {
              case 'small':
                return {
                  minWidth:
                    theme.fonts.labelMedium.lineHeight * (18 / 14) * 1.85,
                };
              case 'large':
                return {
                  minWidth: theme.fonts.titleMedium.lineHeight * (18 / 14) * 2,
                };
              case 'medium':
                return {
                  minWidth: theme.fonts.labelLarge.lineHeight * (20 / 14) * 1.8,
                };
              default:
                return {
                  minWidth: theme.fonts.labelLarge.lineHeight * (18 / 14) * 1.6,
                };
            }
          })(),
        style,
      ]}
      icon={
        icon || loading
          ? // Using a render prop so that we can specify the icon size (or size of the ActivityIndicator).
            // eslint-disable-next-line react/no-unstable-nested-components
            (iconProps) => {
              const iconSize = (() => {
                switch (size) {
                  case 'small':
                    return theme.fonts.labelMedium.fontSize * (18 / 14);
                  case 'large':
                    return theme.fonts.titleMedium.fontSize * (20 / 14);
                  case 'medium':
                    return theme.fonts.labelLarge.fontSize * (20 / 14);
                  default:
                    return theme.fonts.labelLarge.fontSize * (18 / 14);
                }
              })();

              return (
                <View
                  style={[
                    (() => {
                      if (!text) {
                        // If there is no text, we use reverse styles to cancel the margins and center the icon.
                        return mode === 'text'
                          ? paperStyles.md3IconReverseTextMode
                          : paperStyles.md3IconReverse;
                      }

                      // Or else, we need to adjust the spacing between the icon and the text.

                      if (mode === 'text') {
                        return styles[`iconContainer_textMode_${size}`];
                      }

                      return styles[`iconContainer_${size}`];
                    })(),

                    { width: iconSize, height: iconSize },
                  ]}
                >
                  {
                    // eslint-disable-next-line react/no-unstable-nested-components
                    (() => {
                      if (loading) {
                        return (
                          <ActivityIndicator {...iconProps} size={iconSize} />
                        );
                      }

                      if (icon) {
                        return (
                          <Icon {...iconProps} size={iconSize} name={icon} />
                        );
                      }
                    })()
                  }
                </View>
              );
            }
          : undefined
      }
      labelStyle={[
        (() => {
          switch (size) {
            case 'small':
              return theme.fonts.labelMedium;
            case 'large':
              return theme.fonts.titleMedium;
          }
        })(),
        text ? styles[`label_${size}`] : styles.label_noText,
      ]}
    >
      {
        text ? (
          <>
            {/* On some Android devices, the default `labelMedium` font style will got unexpectedly truncated (https://imgur.com/a/cnQtvCN). Adding white spaces with minimal font size before and after the text can fix the issue. */}
            <NativeText style={styles.unexpectedEllipsisFixText}> </NativeText>
            {text}
            <NativeText style={styles.unexpectedEllipsisFixText}> </NativeText>
          </>
        ) : (
          ' '
        ) /* If there is no text, use a white space to let the Text render on iOS, since we need the Text to be rendered to inflate the button to the correct height. */
      }
    </RNButton>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },

  label_small: {
    marginVertical: 6,
    marginHorizontal: 12,
  },
  label_regular: {
    marginVertical: 8,
    marginHorizontal: 14,
  },
  label_medium: {},
  label_large: {},

  label_noText: {
    marginHorizontal: 0,
    width: 0,
  },

  unexpectedEllipsisFixText: {
    fontSize: 0.1,
  },

  iconContainer_small: { marginRight: 8, marginLeft: -6 },
  iconContainer_regular: { marginRight: 8, marginLeft: -2 },
  iconContainer_medium: {},
  iconContainer_large: {},

  iconContainer_textMode_small: {},
  iconContainer_textMode_regular: {},
  iconContainer_textMode_medium: { marginLeft: 4 },
  iconContainer_textMode_large: { marginLeft: 4 },
});

/**
 * Copy-pasted from [react-native-paper/src/components/Button/Button.tsx](https://github.com/callstack/react-native-paper/blob/main/src/components/Button/Button.tsx).
 */
const paperStyles = StyleSheet.create({
  // We leverage these styles to undo the default margin of the icon when there is no text, making the icon centered.
  md3Icon: {
    marginLeft: 16,
    marginRight: -16,
  },
  md3IconReverse: {
    marginLeft: -16,
    marginRight: 16,
  },
  md3IconTextMode: {
    marginLeft: 12,
    marginRight: -8,
  },
  md3IconReverseTextMode: {
    marginLeft: -8,
    marginRight: 12,
  },
});

export default Button;
