import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { Props as ListItemProps } from '../ListItem';

export type Props = {
  children?: React.ReactNode;
};

export const EditButton: React.FC<Props> = React.memo(({ children }) => (
  <View>{children}</View>
));

EditButton.displayName = 'ListItem_EditButton';

export default EditButton;
