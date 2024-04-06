import React, { forwardRef, useCallback } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  useInterceptedRef,
  usePropsWithContextualDefaultValues,
} from '@rnstudy/react-utils';

import { useTextStyles, useUIColors } from '../../contexts';
import Text from '../Text';

import ClearIcon from './ClearIcon';
import TextInputPropsContext from './TextInputPropsContext';

export type Props = RNTextInputProps;

export const TextInput = forwardRef<RNTextInput, Props>(function TextInput(
  rawProps: Props,
  ref,
): JSX.Element {
  const {
    style,
    textAlign,
    placeholder,
    value,
    onChangeText,
    onFocus,
    onBlur,
    clearButtonMode,
    ...restProps
  } = usePropsWithContextualDefaultValues(rawProps, TextInputPropsContext);

  const [textInputRef, textInputRefObject] = useInterceptedRef(ref);

  const textStyles = useTextStyles();
  const uiColors = useUIColors();

  const useFakeAlignRight = textAlign === 'right';

  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = useCallback<
    NonNullable<React.ComponentProps<typeof RNTextInput>['onFocus']>
  >(
    (event) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback<
    NonNullable<React.ComponentProps<typeof RNTextInput>['onBlur']>
  >(
    (event) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const {
    lineHeight: _, // Setting the lineHeight for TextInput will cause the text not to be vertically centered, so we omit it here.
    ...textStyle
  } = textStyles.body;

  const textInputElement = (
    <RNTextInput
      ref={textInputRef}
      {...restProps}
      style={[
        textStyle,
        { color: uiColors.label },
        useFakeAlignRight && styles.fakeAlignRightTextInput,
        useFakeAlignRight && !value && styles.fakeAlignRightTextInput_empty,
        style,
      ]}
      placeholderTextColor={uiColors.placeholderText}
      placeholder={useFakeAlignRight ? undefined : placeholder}
      onChangeText={onChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      clearButtonMode={useFakeAlignRight ? undefined : clearButtonMode}
      value={value}
    />
  );

  const shouldShowClearButton =
    clearButtonMode === 'always' ||
    (clearButtonMode === 'while-editing' && isFocused) ||
    (clearButtonMode === 'unless-editing' && !isFocused);

  if (useFakeAlignRight) {
    const ClearButtonPressable = value ? TouchableOpacity : Pressable;
    return (
      <Pressable
        style={[styles.fakeAlignRightTextInputContainer, style]}
        onPress={() => textInputRefObject.current?.focus()}
      >
        {!value && (
          <Text
            textStyle="body"
            color="placeholder"
            numberOfLines={1}
            style={styles.fakeAlignRightTextInputContainerPlaceholder}
          >
            {placeholder}
          </Text>
        )}
        {textInputElement}
        {shouldShowClearButton && (
          <View
            style={[
              styles.clearIconContainer,
              !value && styles.clearIconContainer_disabled,
            ]}
          >
            <ClearButtonPressable
              onPress={() => {
                if (value) {
                  textInputRefObject.current?.clear();
                  onChangeText?.('');
                } else {
                  textInputRefObject.current?.focus();
                }
              }}
            >
              <ClearIcon fill={uiColors.placeholderText} />
            </ClearButtonPressable>
          </View>
        )}
      </Pressable>
    );
  }

  return textInputElement;
});

TextInput.displayName = 'TextInputIOS';

const styles = StyleSheet.create({
  fakeAlignRightTextInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  fakeAlignRightTextInputContainerPlaceholder: {
    flex: 1,
    textAlign: 'right',
  },
  fakeAlignRightTextInput: {
    flexGrow: 0,
  },
  fakeAlignRightTextInput_empty: {
    flexGrow: 0,
  },
  clearIconContainer: {
    marginStart: 8,
  },
  clearIconContainer_disabled: {
    opacity: 0.5,
  },
});

export default TextInput;
