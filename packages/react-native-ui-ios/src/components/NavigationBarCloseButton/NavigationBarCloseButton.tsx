import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Path, Rect, Svg } from 'react-native-svg';

import { useUIColors } from '../../contexts';

export type Props = {
  onPress?: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function NavigationBarCloseButton({ style, ...restProps }: Props) {
  const uiColors = useUIColors();
  return (
    <TouchableOpacity style={[styles.container, style]} {...restProps}>
      <Svg width="25" height="25" viewBox="0 0 30 30" fill="none">
        <Rect
          width="30"
          height="30"
          rx="15"
          fill={uiColors.tertiarySystemFill}
          fill-opacity="0.12"
        />
        <Path
          d="M9.92188 20.4531C9.79167 20.3229 9.70573 20.1719 9.66406 20C9.6224 19.8229 9.6224 19.6484 9.66406 19.4766C9.70573 19.3047 9.78906 19.1562 9.91406 19.0312L13.5781 15.3672L9.91406 11.7109C9.78906 11.5859 9.70573 11.4375 9.66406 11.2656C9.6224 11.0938 9.6224 10.9219 9.66406 10.75C9.70573 10.5729 9.79167 10.4193 9.92188 10.2891C10.0469 10.1641 10.1953 10.0807 10.3672 10.0391C10.5443 9.99219 10.7188 9.99219 10.8906 10.0391C11.0677 10.0807 11.2188 10.1615 11.3438 10.2812L15 13.9453L18.6641 10.2891C18.7891 10.1641 18.9349 10.0807 19.1016 10.0391C19.2734 9.99219 19.4453 9.99219 19.6172 10.0391C19.7943 10.0807 19.9453 10.1667 20.0703 10.2969C20.2057 10.4219 20.2943 10.5729 20.3359 10.75C20.3776 10.9219 20.3776 11.0938 20.3359 11.2656C20.2943 11.4375 20.2083 11.5859 20.0781 11.7109L16.4297 15.3672L20.0781 19.0312C20.2083 19.1562 20.2943 19.3047 20.3359 19.4766C20.3776 19.6484 20.3776 19.8229 20.3359 20C20.2943 20.1719 20.2057 20.3203 20.0703 20.4453C19.9453 20.5755 19.7943 20.6641 19.6172 20.7109C19.4453 20.7526 19.2734 20.7526 19.1016 20.7109C18.9349 20.6693 18.7891 20.5833 18.6641 20.4531L15 16.7969L11.3438 20.4609C11.2188 20.5807 11.0677 20.6641 10.8906 20.7109C10.7188 20.7526 10.5443 20.7526 10.3672 20.7109C10.1953 20.6641 10.0469 20.5781 9.92188 20.4531Z"
          fill={uiColors.secondaryLabel}
          fill-opacity="0.6"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: -8,
  },
});

export default NavigationBarCloseButton;
