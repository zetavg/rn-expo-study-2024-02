import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icon, type IconName } from '@rnstudy/react-icons';

import { useColors } from '../../../contexts';
import Text from '../../Text';

export type Props = {
  label?: string;
  icon?: IconName;
  onPress?: () => void;
};

export function AccessoryButton({ label, icon, onPress }: Props): JSX.Element {
  const colors = useColors();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {!!icon && (
          <View style={styles.iconContainer}>
            <Icon
              name={icon}
              color={colors.primary}
              size={24}
              bordered={false}
            />
          </View>
        )}
        {!!label && (
          <Text style={{ color: colors.primary }} variant="bodyMedium">
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  iconContainer: {
    // width: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AccessoryButton;
