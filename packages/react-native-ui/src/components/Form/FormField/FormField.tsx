import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import { useUIPlatform } from '../../../contexts';
import { ListItem, ListItemProps } from '../../List';
import Text from '../../Text';

import FormFieldPropsContext from './FormFieldPropsContext';

export type Props = {
  label: string;
  /** Set this to true to make the field vertical. Fields are horizontal (i.e. the label is on the left and the input is on the right) by default. */
  vertical?: boolean;
  children: React.ReactElement;
} & Omit<ListItemProps, 'title' | 'accessories' | 'children'>;

export function FormField(rawProps: Props) {
  const { label, vertical, children, ...restProps } =
    usePropsWithContextualDefaultValues(rawProps, FormFieldPropsContext);

  const uiPlatform = useUIPlatform();

  return (
    <ListItem
      {...restProps}
      accessoriesContainsTextInput={!vertical}
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
      accessories={vertical ? undefined : children}
      children={
        vertical ? (
          <View
            style={
              uiPlatform === 'android'
                ? styles.childrenContainerOnAndroid
                : styles.childrenContainer
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
  childrenContainer: {
    marginTop: -6,
  },
  childrenContainerOnAndroid: {
    marginTop: Platform.OS === 'ios' ? -4 : -6,
    marginBottom: Platform.OS === 'ios' ? 2 : 0,
  },
});

export default FormField;
