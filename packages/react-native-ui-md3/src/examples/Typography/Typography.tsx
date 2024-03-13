import React from 'react';
import { Alert, View } from 'react-native';

import { Text } from '../../components';
import { useTheme } from '../../contexts';

export function Typography() {
  const theme = useTheme();
  return (
    <View>
      <Text variant="displayLarge">
        Display Large - {theme.fonts.displayLarge.fontSize}/
        {theme.fonts.displayLarge.lineHeight}
      </Text>
      <Text variant="displayMedium">
        Display Medium - {theme.fonts.displayMedium.fontSize}/
        {theme.fonts.displayMedium.lineHeight}
      </Text>
      <Text variant="displaySmall">
        Display Small - {theme.fonts.displaySmall.fontSize}/
        {theme.fonts.displaySmall.lineHeight}
      </Text>

      <Text />

      <Text variant="headlineLarge">
        Headline Large - {theme.fonts.headlineLarge.fontSize}/
        {theme.fonts.headlineLarge.lineHeight}
      </Text>
      <Text variant="headlineMedium">
        Headline Medium - {theme.fonts.headlineMedium.fontSize}/
        {theme.fonts.headlineMedium.lineHeight}
      </Text>
      <Text variant="headlineSmall">
        Headline Small - {theme.fonts.headlineSmall.fontSize}/
        {theme.fonts.headlineSmall.lineHeight}
      </Text>

      <Text />

      <Text variant="titleLarge">
        Title Large - {theme.fonts.titleLarge.fontSize}/
        {theme.fonts.titleLarge.lineHeight}
      </Text>
      <Text variant="titleMedium">
        Title Medium - {theme.fonts.titleMedium.fontSize}/
        {theme.fonts.titleMedium.lineHeight}
      </Text>
      <Text variant="titleSmall">
        Title Small - {theme.fonts.titleSmall.fontSize}/
        {theme.fonts.titleSmall.lineHeight}
      </Text>

      <Text />

      <Text variant="labelLarge">
        Label Large - {theme.fonts.labelLarge.fontSize}/
        {theme.fonts.labelLarge.lineHeight}
      </Text>
      <Text variant="labelMedium">
        Label Medium - {theme.fonts.labelMedium.fontSize}/
        {theme.fonts.labelMedium.lineHeight}
      </Text>
      <Text variant="labelSmall">
        Label Small - {theme.fonts.labelSmall.fontSize}/
        {theme.fonts.labelSmall.lineHeight}
      </Text>

      <Text />

      <Text variant="bodyLarge">
        Body Large - {theme.fonts.bodyLarge.fontSize}/
        {theme.fonts.bodyLarge.lineHeight}
      </Text>
      <Text variant="bodyMedium">
        Body Medium - {theme.fonts.bodyMedium.fontSize}/
        {theme.fonts.bodyMedium.lineHeight}
      </Text>
      <Text variant="bodySmall">
        Body Small - {theme.fonts.bodySmall.fontSize}/
        {theme.fonts.bodySmall.lineHeight}
      </Text>

      <Text />

      <Text>Default</Text>
    </View>
  );
}

export default Typography;
