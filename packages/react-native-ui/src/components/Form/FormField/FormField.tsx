import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import { useUIPlatform } from '../../../contexts';
import { ListItem, ListItemProps } from '../../List';
import Text from '../../Text';

import FormFieldPropsContext from './FormFieldPropsContext';

export type Props = {
  label: string;
  description?: string | React.ReactElement;
  errorMessage?: string | React.ReactElement;
  /** Set this to true to make the field vertical. Fields are horizontal (i.e. the label is on the left and the input is on the right) by default. */
  vertical?: boolean;
  /** Preserves a wider space for the children. Defaults to `true`. */
  preserveChildrenSpace?: boolean;
  children: React.ReactElement;
} & Omit<ListItemProps, 'title' | 'accessories' | 'children'>;

export function FormField(rawProps: Props) {
  const {
    label,
    description,
    errorMessage,
    vertical,
    preserveChildrenSpace = true,
    children,
    ...restProps
  } = usePropsWithContextualDefaultValues(rawProps, FormFieldPropsContext);

  const uiPlatform = useUIPlatform();

  const errorMessageElement = errorMessage ? (
    <Text
      footnote
      color="destructive"
      style={
        errorTextStyles[`${vertical ? 'vertical' : 'horizontal'}_${uiPlatform}`]
      }
    >
      {errorMessage}
    </Text>
  ) : undefined;

  return (
    <ListItem
      {...restProps}
      singleLine={false}
      accessoriesContainsTextInput={!vertical && preserveChildrenSpace}
      accessoriesVerticalAlignCenter
      title={
        <Text style={labelStyles[uiPlatform]} color="secondaryVariant">
          {label}
        </Text>
      }
      subtitle={
        description ? (
          <Text
            footnote
            style={descriptionStyles[uiPlatform]}
            color={uiPlatform === 'android' ? 'tertiary' : 'secondary'}
          >
            {description}
          </Text>
        ) : undefined
      }
      shrinkTitleVertical
      accessories={vertical ? undefined : children}
      children={
        vertical ? (
          <>
            <View
              style={
                childrenContainerStyles[
                  `${description ? 'with' : 'without'}Description_${vertical ? 'vertical' : 'horizontal'}_${uiPlatform}`
                ]
              }
            >
              {children}
            </View>
            {errorMessageElement}
          </>
        ) : (
          errorMessageElement
        )
      }
    />
  );
}

const childrenContainerStyles = StyleSheet.create({
  withoutDescription_horizontal_ios: {
    marginTop: -6,
  },
  withoutDescription_horizontal_android: {
    marginTop: Platform.OS === 'ios' ? -4 : -6,
    marginBottom: Platform.OS === 'ios' ? 2 : 0,
  },
  withoutDescription_vertical_ios: {
    marginTop: -6,
  },
  withoutDescription_vertical_android: {
    marginTop: Platform.OS === 'ios' ? -4 : -6,
    marginBottom: Platform.OS === 'ios' ? 2 : 0,
  },
  withDescription_horizontal_ios: {},
  withDescription_horizontal_android: {},
  withDescription_vertical_ios: {
    marginTop: -5,
  },
  withDescription_vertical_android: {},
});

const labelStyles = StyleSheet.create({
  ios: {
    fontSize: 14,
    fontWeight: '500',
  },
  android: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
});

const descriptionStyles = StyleSheet.create({
  ios: {
    opacity: 0.8,
  },
  android: {
    opacity: 1,
  },
});

const errorTextStyles = StyleSheet.create({
  horizontal_ios: {
    textAlign: 'right',
    marginTop: -6,
    marginBottom: -5,
  },
  horizontal_android: {
    textAlign: 'right',
    marginTop: -4,
    marginRight: -10,
    marginBottom: -5,
  },
  vertical_ios: {
    marginBottom: -5,
  },
  vertical_android: {
    marginBottom: -5,
  },
});

export default FormField;
