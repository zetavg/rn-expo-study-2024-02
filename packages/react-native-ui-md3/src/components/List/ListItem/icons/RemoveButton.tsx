import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export function RemoveButton({
  fill,
  style,
}: {
  fill?: string;
  style?: React.ComponentProps<typeof Svg>['style'];
}) {
  return (
    <Svg width="24" height="22" viewBox="0 0 24 22" fill="none" style={style}>
      <Circle cx="12" cy="11" r="11" fill={fill} />
      <Path
        d="M8.04224 11.6812H15.9507C16.1584 11.6812 16.3377 11.6033 16.4888 11.4475C16.6445 11.2917 16.7224 11.1077 16.7224 10.8953C16.7224 10.6829 16.6445 10.4988 16.4888 10.343C16.3377 10.1873 16.1584 10.1094 15.9507 10.1094H8.04224C7.84399 10.1094 7.66463 10.1873 7.50415 10.343C7.34839 10.4988 7.27051 10.6829 7.27051 10.8953C7.27051 11.1077 7.34839 11.2917 7.50415 11.4475C7.66463 11.6033 7.84399 11.6812 8.04224 11.6812Z"
        fill="white"
      />
    </Svg>
  );
}

export default RemoveButton;
