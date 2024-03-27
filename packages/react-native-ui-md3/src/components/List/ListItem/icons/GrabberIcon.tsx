import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const GrabberIcon = React.memo(function GrabberIcon({
  fill,
  style,
}: {
  fill?: string;
  style?: React.ComponentProps<typeof Svg>['style'];
}) {
  return (
    <Svg width="23" height="12" viewBox="0 0 23 12" fill="none" style={style}>
      <Path
        d="M1.43457 11.7656C1.21257 11.7656 1.02279 11.6868 0.865234 11.5293C0.707682 11.3646 0.628906 11.1676 0.628906 10.9385C0.628906 10.7165 0.707682 10.5267 0.865234 10.3691C1.02279 10.2116 1.21257 10.1328 1.43457 10.1328H21.5439C21.766 10.1328 21.9557 10.2116 22.1133 10.3691C22.278 10.5267 22.3604 10.7165 22.3604 10.9385C22.3604 11.1676 22.278 11.3646 22.1133 11.5293C21.9557 11.6868 21.766 11.7656 21.5439 11.7656H1.43457ZM1.43457 7.07129C1.21257 7.07129 1.02279 6.99251 0.865234 6.83496C0.707682 6.67741 0.628906 6.48763 0.628906 6.26562C0.628906 6.03646 0.707682 5.8431 0.865234 5.68555C1.02279 5.52083 1.21257 5.43848 1.43457 5.43848H21.5439C21.766 5.43848 21.9557 5.52083 22.1133 5.68555C22.278 5.8431 22.3604 6.03646 22.3604 6.26562C22.3604 6.48763 22.278 6.67741 22.1133 6.83496C21.9557 6.99251 21.766 7.07129 21.5439 7.07129H1.43457ZM1.43457 2.3877C1.21257 2.3877 1.02279 2.30892 0.865234 2.15137C0.707682 1.99382 0.628906 1.80404 0.628906 1.58203C0.628906 1.35286 0.707682 1.15951 0.865234 1.00195C1.02279 0.844401 1.21257 0.765625 1.43457 0.765625H21.5439C21.766 0.765625 21.9557 0.844401 22.1133 1.00195C22.278 1.15951 22.3604 1.35286 22.3604 1.58203C22.3604 1.80404 22.278 1.99382 22.1133 2.15137C21.9557 2.30892 21.766 2.3877 21.5439 2.3877H1.43457Z"
        fill={fill}
      />
    </Svg>
  );
});
GrabberIcon.displayName = 'GrabberIcon';

export default GrabberIcon;