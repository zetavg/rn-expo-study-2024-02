import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useUIColors } from '../../../../contexts';
import DII from '../icons/DrillInIcon';
import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  // children: React.ReactNode;
};

export const DrillInIcon: React.FC<Props> = React.memo(({}) => {
  const uiColors = useUIColors();

  return <DII style={styles.drillInIcon} fill={uiColors.tertiaryLabel} />;
});

DrillInIcon.displayName = 'ListItem_DrillInIcon';

const styles = StyleSheet.create({
  drillInIcon: {
    alignSelf: 'center',
  },
});

export default DrillInIcon;
