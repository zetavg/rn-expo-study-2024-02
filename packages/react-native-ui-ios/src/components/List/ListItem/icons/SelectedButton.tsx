import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export function SelectedButton({
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
        d="M10.8955 15.9363C11.2542 15.9363 11.5327 15.79 11.731 15.4973L16.8711 7.53931C16.9419 7.43075 16.9915 7.3269 17.0198 7.22778C17.0528 7.12866 17.0693 7.0319 17.0693 6.9375C17.0693 6.69678 16.9891 6.5009 16.8286 6.34985C16.6729 6.19409 16.4722 6.11621 16.2268 6.11621C16.0569 6.11621 15.9153 6.15161 15.802 6.22241C15.6887 6.28849 15.5778 6.40177 15.4692 6.56226L10.8672 13.8831L8.48828 10.8245C8.29948 10.5837 8.06584 10.4634 7.78735 10.4634C7.53719 10.4634 7.33187 10.5436 7.17139 10.7041C7.0109 10.8599 6.93066 11.0581 6.93066 11.2988C6.93066 11.4074 6.94954 11.5136 6.9873 11.6174C7.02507 11.7166 7.08879 11.8204 7.17847 11.929L10.0601 15.5186C10.2866 15.797 10.5651 15.9363 10.8955 15.9363Z"
        fill="white"
      />
    </Svg>
  );
}

export default SelectedButton;