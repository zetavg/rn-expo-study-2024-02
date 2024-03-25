import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const DrillInIcon = React.memo(function DrillInIcon({
  fill,
  style,
}: {
  fill?: string;
  style?: React.ComponentProps<typeof Svg>['style'];
}) {
  return (
    <Svg width="8" height="32" viewBox="0 0 8 32" fill="none" style={style}>
      <Path
        d="M7.84961 16.0068C7.84961 16.1507 7.82194 16.2835 7.7666 16.4053C7.71126 16.527 7.62549 16.646 7.50928 16.7622L2.53711 21.6846C2.35449 21.8672 2.13314 21.9585 1.87305 21.9585C1.60189 21.9585 1.37223 21.8672 1.18408 21.6846C0.995931 21.4964 0.901855 21.2695 0.901855 21.0039C0.901855 20.7383 1.00423 20.5031 1.20898 20.2983L5.56689 16.0068L1.20898 11.7153C1.00423 11.5106 0.901855 11.2754 0.901855 11.0098C0.901855 10.7441 0.995931 10.52 1.18408 10.3374C1.37223 10.1493 1.60189 10.0552 1.87305 10.0552C2.13314 10.0552 2.35449 10.1465 2.53711 10.3291L7.50928 15.2515C7.73617 15.4673 7.84961 15.7191 7.84961 16.0068Z"
        fill={fill}
      />
    </Svg>
  );
});
DrillInIcon.displayName = 'DrillInIcon';

export default DrillInIcon;
