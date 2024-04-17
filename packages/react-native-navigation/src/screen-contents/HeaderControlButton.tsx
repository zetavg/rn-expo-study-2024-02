import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import { Appbar, Button as RNPButton } from 'react-native-paper';

import { Icon, IconDefinitions, IconName } from '@rnstudy/react-icons';
import {
  useIOSUIColors,
  useMD3Colors,
  useUIPlatform,
} from '@rnstudy/react-native-ui';

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

  const iosTintColor = disabled
    ? iosUIColors.quaternaryLabel
    : iosUIColors.tintColor;

  const md3Colors = useMD3Colors();

  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return (
        <TouchableOpacity disabled={disabled} {...restProps}>
          {icon ? (
            <Icon name={icon} color={iosTintColor} size={25} />
          ) : (
            <Text
              allowFontScaling={false}
              style={[
                styles.labelTextIOS,
                mandatory && styles.labelTextIOS_mandatory,
                { color: iosTintColor },
              ]}
            >
              {label}
            </Text>
          )}
        </TouchableOpacity>
      );
    }
    case 'android': {
      if (icon) {
        return (
          <Appbar.Action
            accessibilityLabel={label}
            // eslint-disable-next-line react/no-unstable-nested-components
            icon={(props) => <Icon {...props} name={icon} />}
            disabled={disabled}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(restProps as any)}
          />
        );
      }

      return (
        <RNPButton
          textColor={md3Colors.onSurfaceVariant}
          uppercase
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(restProps as any)}
        >
          {label}
        </RNPButton>
      );
    }
  }
});

HeaderControlButton.displayName = 'HeaderControlButton';

const styles = StyleSheet.create({
  labelTextIOS: {
    fontSize: 17,
    paddingHorizontal: 2,
  },
  labelTextIOS_mandatory: {
    fontWeight: '600',
  },
});

export default HeaderControlButton;