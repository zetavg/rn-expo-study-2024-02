import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SegmentedControl } from '@rnstudy/react-native-ui-ios';
import { RadioButton, Text as TextMD3 } from '@rnstudy/react-native-ui-md3';
import {
  arePropsWithOnValueChangeFunctionEqual,
  OnValueChangeIsDependencyFreeProps,
  typedMemo,
} from '@rnstudy/react-utils';

import { useUIPlatform } from '../../../contexts';
import { SelectProps } from '../../Select';
import FormField, { FormFieldProps } from '../FormField';

type Props<T extends string> = Omit<FormFieldProps, 'children'> &
  SelectProps<T> &
  OnValueChangeIsDependencyFreeProps;

/**
 * A form control that uses segmented control on iOS and radio buttons on other platforms, as a drop-in replacement for `Select`.
 *
 * Recommended for controls with 3 or less options.
 */
export const FormRadioButtons = typedMemo(function FormRadioButtons<
  T extends string,
>(props: Props<T>) {
  const uiPlatform = useUIPlatform();

  // const { vertical } = usePropsWithContextualDefaultValues(
  //   props,
  //   FormFieldPropsContext,
  // );

  return (
    <FormField {...props} vertical={false}>
      {(() => {
        switch (uiPlatform) {
          case 'ios': {
            const options = Object.fromEntries(
              Object.entries(props.options).map(([k, v]) => {
                const option =
                  v as (typeof props)['options'][keyof (typeof props)['options']];
                return [k, option.shortLabel || option.label];
              }),
            ) as { [key in T]: string };
            return <SegmentedControl {...props} options={options} />;
          }

          default:
            return (
              <View>
                {Object.entries(props.options).map(([k, v]) => {
                  const option =
                    v as (typeof props)['options'][keyof (typeof props)['options']];
                  return (
                    <View
                      key={k}
                      style={[
                        styles.radioButtonItem,
                        // {
                        //   flexDirection: vertical ? 'row' : 'row-reverse',
                        // },
                      ]}
                    >
                      <RadioButton
                        key={k}
                        value={k}
                        status={props.value === k ? 'checked' : 'unchecked'}
                        onPress={() => {
                          props.onValueChange(k as T);
                        }}
                      />
                      <TouchableOpacity
                        style={styles.radioButtonLabelContainer}
                        onPress={() => {
                          props.onValueChange(k as T);
                        }}
                      >
                        <TextMD3 variant="labelMedium">{option.label}</TextMD3>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            );
        }
      })()}
    </FormField>
  );
}, arePropsWithOnValueChangeFunctionEqual);

FormRadioButtons.displayName = 'FormRadioButtons';

const styles = StyleSheet.create({
  radioButtonItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  radioButtonLabelContainer: {
    paddingVertical: 5,
  },
});

export default FormRadioButtons;
