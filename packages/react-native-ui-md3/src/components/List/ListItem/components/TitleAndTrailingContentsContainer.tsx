import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CONTENT_CONTAINER_GAP } from '../consts';

export type Props = {
  children: React.ReactNode;
  onLayout?: React.ComponentProps<typeof View>['onLayout'];
};

export const TitleAndTrailingContentsContainer = ({
  children,
  onLayout,
}: Props): JSX.Element => (
  <View style={styles.container} onLayout={onLayout}>
    {children}
  </View>
);

TitleAndTrailingContentsContainer.displayName =
  'ListItem_TitleAndTrailingContentsContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: CONTENT_CONTAINER_GAP,
  },
});

export default TitleAndTrailingContentsContainer;
