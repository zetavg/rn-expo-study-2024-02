import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
} from 'react-native';

import { Icon, IconName } from '@rnstudy/react-icons';
import { useIOSUIColors } from '@rnstudy/react-native-ui';

type Props = {
  icon?: IconName;
  label: string;
  mandatory?: boolean;
} & TouchableWithoutFeedbackProps;

export const HeaderControlButton = memo(function HeaderControlButton({
  icon,
  label,
  mandatory,
  disabled,
  ...restProps
}: Props) {
  const iosUIColors = useIOSUIColors();

  const color = disabled ? iosUIColors.quaternaryLabel : iosUIColors.tintColor;

  return (
    <TouchableOpacity disabled={disabled} {...restProps}>
      {icon ? (
        <Icon name={icon} color={color} size={25} />
      ) : (
        <Text
          allowFontScaling={false}
          style={[
            styles.labelText,
            mandatory && styles.labelText_mandatory,
            { color },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
});

HeaderControlButton.displayName = 'HeaderControlButton';

const styles = StyleSheet.create({
  labelText: {
    fontSize: 17,
    paddingHorizontal: 2,
  },
  labelText_mandatory: {
    fontWeight: '600',
  },
});

export default HeaderControlButton;
