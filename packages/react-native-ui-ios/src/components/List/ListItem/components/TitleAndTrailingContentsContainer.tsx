import React from 'react';
import { StyleSheet, View } from 'react-native';

export type Props = {
  children: React.ReactNode;
};

export const TitleAndTrailingContentsContainer = ({
  children,
}: Props): JSX.Element => <View style={styles.container}>{children}</View>;

TitleAndTrailingContentsContainer.displayName =
  'ListItem_TitleAndTrailingContentsContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
});

export default TitleAndTrailingContentsContainer;
