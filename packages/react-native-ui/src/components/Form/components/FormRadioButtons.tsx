import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SegmentedControl } from '@rnstudy/react-native-ui-ios';
import { RadioButton, Text as TextMD3 } from '@rnstudy/react-native-ui-md3';

import { useUIPlatform } from '../../../contexts';
import { SelectProps } from '../../Select';
import FormField, { FormFieldProps } from '../FormField';

type Props<T extends string> = Omit<FormFieldProps, 'children'> &
  SelectProps<T>;

/**
 * A form control that uses segmented control on iOS and radio buttons on other platforms, as a drop-in replacement for `Select`.
 *
 * Recommended for controls with 3 or less options.
 */
export function FormRadioButtons<T extends string>(props: Props<T>) {
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
                      <TextMD3
                        variant="labelMedium"
                        onPress={() => {
                          props.onValueChange(k as T);
                        }}
                      >
                        {option.label}
                      </TextMD3>
                    </View>
                  );
                })}
              </View>
            );
        }
      })()}
    </FormField>
  );
}

const styles = StyleSheet.create({
  radioButtonItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});

export default FormRadioButtons;
