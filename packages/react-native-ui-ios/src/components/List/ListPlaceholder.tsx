import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';

import { withPropDefaultValuesContext } from '@rnstudy/react-utils';

import { useUIColors } from '../../contexts';
import BackgroundColor from '../BackgroundColor';
import Text, { TextProps, TextPropsContext } from '../Text';

import {
  containerBorderRadiusStyles,
  containerStyles,
} from './ListItem/components/OuterContainer';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  /** The style of the list. */
  listStyle: ListStyle;
  /** The placeholder to display. */
  placeholder: Readonly<React.JSX.Element> | string;
  loading?: boolean;
  style?: ViewStyle;
};

export function ListPlaceholder({
  listStyle,
  placeholder,
  loading,
  style,
}: Props) {
  const uiColors = useUIColors();
  return (
    <BackgroundColor>
      {(backgroundColor) => (
        <View
          style={[
            placeholderContainerStyles.default,
            {
              backgroundColor,
              borderColor: uiColors.opaqueSeparator,
            },
            placeholderContainerStyles[listStyle],
            loading && styles.loadingContent,
            style,
          ]}
        >
          <Text {...PLACEHOLDER_TEXT_PROPS}>
            {typeof placeholder === 'string'
              ? placeholder
              : withPropDefaultValuesContext(placeholder, {
                  textProps: {
                    value: PLACEHOLDER_TEXT_PROPS,
                    context: TextPropsContext,
                  },
                })}
          </Text>

          {loading && (
            <View
              style={[
                StyleSheet.absoluteFill,
                styles.activityIndicatorContainer,
              ]}
            >
              <ActivityIndicator color={uiColors.secondaryLabel} />
            </View>
          )}
        </View>
      )}
    </BackgroundColor>
  );
}

const PLACEHOLDER_TEXT_PROPS: TextProps = {
  textStyle: 'callout',
  color: 'secondary',
  style: { textAlign: 'center' },
};

const styles = StyleSheet.create({
  loadingContent: {
    opacity: 0.75,
  },
  activityIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const placeholderContainerStyles = StyleSheet.create({
  default: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plain: {
    ...containerStyles.plain,
    ...containerStyles.plain_only,
    ...containerBorderRadiusStyles.plain,
    ...containerBorderRadiusStyles.plain_only,
  },
  grouped: {
    ...containerStyles.grouped,
    ...containerStyles.grouped_only,
    ...containerBorderRadiusStyles.grouped,
    ...containerBorderRadiusStyles.grouped_only,
  },
  insetGrouped: {
    ...containerStyles.insetGrouped,
    ...containerStyles.insetGrouped_only,
    ...containerBorderRadiusStyles.insetGrouped,
    ...containerBorderRadiusStyles.insetGrouped_only,
  },
});

export default ListPlaceholder;
