import React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useColors } from '../../../../contexts';
import { EDIT_BUTTON_CONTAINER_WIDTH } from '../consts';
import type { Props as ListItemProps } from '../ListItem';
import { useListItemAnimationContext } from '../ListItemAnimationContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Props = {
  editButton: ListItemProps['editButton'];
  onEditButtonPress: ListItemProps['onEditButtonPress'];
};

export function propsSelector(p: ListItemProps): Props {
  return {
    editButton: p.editButton,
    onEditButtonPress: p.onEditButtonPress,
  };
}

export const EditButton = React.memo(
  ({ editButton, onEditButtonPress }: Props): JSX.Element | null => {
    const colors = useColors();

    const { shouldRenderEditButton, editButtonStyle } =
      useListItemAnimationContext();

    const editButtonToRender = editButton || shouldRenderEditButton;

    if (!editButtonToRender) return null;

    return (
      <AnimatedPressable
        style={[styles.editButtonContainer, editButtonStyle]}
        onPress={() => {
          onEditButtonPress?.();
        }}
      >
        {({ pressed }) => {
          switch (editButtonToRender) {
            case 'unselected':
            case 'selected':
              return (
                <Checkbox.Android
                  status={
                    editButtonToRender === 'selected' ? 'checked' : 'unchecked'
                  }
                />
              );
            case 'add':
              return (
                <MaterialIcon
                  name="plus-circle"
                  size={24}
                  color={colors.green}
                />
              );
            case 'remove':
              return (
                <MaterialIcon
                  name="minus-circle"
                  size={24}
                  color={colors.red}
                />
              );
            default:
              return null;
          }
        }}
      </AnimatedPressable>
    );
  },
);

EditButton.displayName = 'ListItem_EditButton';

const styles = StyleSheet.create({
  editButtonContainer: {
    width: EDIT_BUTTON_CONTAINER_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditButton;
