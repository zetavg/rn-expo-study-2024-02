import React from 'react';
import Svg, { Circle } from 'react-native-svg';

export function UnselectedButton({
  fill,
  style,
}: {
  fill?: string;
  style?: React.ComponentProps<typeof Svg>['style'];
}) {
  return (
    <Svg width="24" height="22" viewBox="0 0 24 22" fill="none" style={style}>
      <Circle cx="12" cy="11" r="10.25" stroke={fill} stroke-width="1.5" />
    </Svg>
  );
}

export default UnselectedButton;
