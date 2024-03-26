import React from 'react';
import { StyleSheet } from 'react-native';

import { useUIColors } from '../../../../contexts';
import DII from '../icons/DrillInIcon';
import { useListItemAnimationContext } from '../ListItemAnimationContext';

export type Props = {
  hide?: boolean;
};

export const DrillInIcon = React.memo(({ hide }: Props): JSX.Element => {
  const uiColors = useUIColors();

  const { delayedHideTrailingContents } = useListItemAnimationContext();

  return (
    <DII
      style={[
        styles.drillInIcon,
        (hide || delayedHideTrailingContents) && styles.hidden,
      ]}
      fill={uiColors.tertiaryLabel}
    />
  );
});

DrillInIcon.displayName = 'ListItem_DrillInIcon';

const styles = StyleSheet.create({
  drillInIcon: {
    alignSelf: 'center',
  },
  hidden: {
    display: 'none',
  },
});

export default DrillInIcon;
