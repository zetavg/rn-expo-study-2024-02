import React, { useContext } from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import textStyles from '../../styles/textStyles';
import ThemeContext from '../../ThemeContext';

import DrillInIcon from './DrillInIcon';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

type Props = {
  listStyle?: ListStyle;
};

export function ListRow({ listStyle = 'insetGrouped' }: Props) {
  const theme = useContext(ThemeContext);
  const windowDimensions = useWindowDimensions();
  const uiScale = Math.max(windowDimensions.fontScale, 1);
  return (
    <View
      style={[
        styles.container,
        containerStyles[listStyle],
        {
          backgroundColor: theme.colors.secondarySystemGroupedBackground,
          minHeight: 44 * uiScale,
        },
      ]}
    >
      <View style={styles.titleAndTrailingAccessoriesContainer}>
        <View style={styles.titleAndDetailContainer}>
          <Text
            numberOfLines={1}
            style={[textStyles.body, { color: theme.colors.label }]}
          >
            Title Title Title Title Title Title
          </Text>
          <Text
            numberOfLines={1}
            style={[textStyles.footnote, { color: theme.colors.label }]}
          >
            Details Details Details Details Details Details
          </Text>

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
              Detail Detail Detail
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
    backgroundColor: 'red',
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
  accessoriesAndGrabberContainer: {
    flexGrow: 1,
    flexShrink: 3,
    flexDirection: 'row',
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
