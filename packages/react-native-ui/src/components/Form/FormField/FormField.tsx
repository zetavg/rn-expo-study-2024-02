import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import { useUIPlatform } from '../../../contexts';
import { ListItem, ListItemProps } from '../../List';
import Text from '../../Text';

import FormFieldPropsContext from './FormFieldPropsContext';

export type Props = {
  label: string;
  description?: string;
  /** Set this to true to make the field vertical. Fields are horizontal (i.e. the label is on the left and the input is on the right) by default. */
  vertical?: boolean;
  children: React.ReactElement;
} & Omit<ListItemProps, 'title' | 'accessories' | 'children'>;

export function FormField(rawProps: Props) {
  const { label, description, vertical, children, ...restProps } =
    usePropsWithContextualDefaultValues(rawProps, FormFieldPropsContext);

  const uiPlatform = useUIPlatform();

  return (
    <ListItem
      {...restProps}
      singleLine={false}
      accessoriesContainsTextInput={!vertical}
      accessoriesVerticalAlignCenter
      title={
        <Text
          style={
            uiPlatform === 'android' ? styles.labelOnAndroid : styles.label
          }
          color="secondaryVariant"
        >
          {label}
        </Text>
      }
      subtitle={
        description ? (
          <Text
            footnote
            style={
              uiPlatform === 'android'
                ? styles.descriptionOnAndroid
                : styles.description
            }
            color={uiPlatform === 'android' ? 'tertiary' : 'secondary'}
          >
            {description}
          </Text>
        ) : undefined
      }
      accessories={vertical ? undefined : children}
      children={
        vertical ? (
          <View
            style={
              !description
                ? uiPlatform === 'android'
                  ? styles.childrenContainerWithoutDescriptionOnAndroid
                  : styles.childrenContainerWithoutDescription
                : undefined
            }
          >
            {children}
          </View>
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelOnAndroid: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
  description: {
    opacity: 0.8,
  },
  descriptionOnAndroid: {
    opacity: 1,
  },
  childrenContainerWithoutDescription: {
    marginTop: -6,
  },
  childrenContainerWithoutDescriptionOnAndroid: {
    marginTop: Platform.OS === 'ios' ? -4 : -6,
    marginBottom: Platform.OS === 'ios' ? 2 : 0,
  },
});

export default FormField;
