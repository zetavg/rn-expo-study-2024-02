import React, { useContext, useMemo } from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import textStyles from '../../styles/textStyles';
import ThemeContext from '../../ThemeContext';
import { Theme } from '../../themes/type';

import DrillInIcon from './DrillInIcon';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

type Props = {
  /** The style of the list. */
  listStyle?: ListStyle;
  children:
    | string
    | ((context: {
        textProps: React.ComponentProps<typeof Text>;
        textStyles: typeof textStyles;
        colors: Theme['colors'];
      }) => React.ReactNode);
  // details?: string;
};

export function ListRow({ listStyle = 'insetGrouped', children }: Props) {
  const theme = useContext(ThemeContext);
  const windowDimensions = useWindowDimensions();
  const uiScale = Math.max(windowDimensions.fontScale, 1);

  const textProps = useMemo<React.ComponentProps<typeof Text>>(
    () => ({
      numberOfLines: 1,
      style: [textStyles.body, { color: theme.colors.label }],
    }),
    [theme.colors.label],
  );
  return (
    <View
      style={[
        styles.container,
        containerStyles[listStyle],
        {
          backgroundColor: theme.colors.secondarySystemGroupedBackground,
          minHeight: 44 * Math.max(1, Math.min(uiScale, 1.2)),
        },
      ]}
    >
      <View style={styles.titleAndTrailingAccessoriesContainer}>
        <View style={styles.contentContainer}>
          {(() => {
            if (typeof children === 'string') {
              return <Text {...textProps}>{children}</Text>;
            }

            return children({ textProps, textStyles, colors: theme.colors });
          })()}

          {/* <Text style={[textStyles.body, { color: theme.colors.label }]}>
            iCloud - {windowDimensions.fontScale}
          </Text>
          <Text style={[textStyles.footnote, { color: theme.colors.label }]}>
            iCloud Drive, iCloud Main, Safari
          </Text> */}

          {/* <Text style={[textStyles.body, { color: theme.colors.label }]}>
            VPN & Device Management
          </Text> */}
        </View>

        <View style={styles.accessoriesAndGrabberContainer}>
          <View style={styles.trailingContentsContainer}>
            <Text
              style={[
                textStyles.body,
                {
                  color: theme.colors.secondaryLabel,
                  overflow: 'hidden',
                  flexShrink: 1,
                },
              ]}
              numberOfLines={1}
            >
              Detail
            </Text>
            <DrillInIcon
              style={styles.trailingIcon}
              fill={theme.colors.tertiaryLabel}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 16,
    gap: 4,
    overflow: 'hidden',
  },
  titleAndTrailingAccessoriesContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
  },
  titleAndDetailContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: -2,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: -2,
  },
  accessoriesAndGrabberContainer: {
    flexGrow: 1,
    flexShrink: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  trailingContentsContainer: {
    flexDirection: 'row',
    paddingRight: 16,
    gap: 14,
    alignItems: 'center',
  },
  trailingIcon: {
    flexShrink: 0,
  },
});

const containerStyles = StyleSheet.create({
  plain: {},
  grouped: {},
  insetGrouped: {
    marginHorizontal: 16,
    borderRadius: 10,
  },
});

export default ListRow;
