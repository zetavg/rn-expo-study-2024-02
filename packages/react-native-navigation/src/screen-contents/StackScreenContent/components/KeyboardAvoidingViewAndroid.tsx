import React, { useContext } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
export function KeyboardAvoidingViewAndroid({
  children,
}: {
  children: React.ReactNode;
}) {
  const safeAreaInsets = useSafeAreaInsets();
  const bottomTabBarHeight = useContext(BottomTabBarHeightContext);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={
        bottomTabBarHeight
          ? bottomTabBarHeight
          : safeAreaInsets.bottom +
            12 /* I don't know why we need this magic number */
      }
    >
      {children}
    </KeyboardAvoidingView>
  );
}
