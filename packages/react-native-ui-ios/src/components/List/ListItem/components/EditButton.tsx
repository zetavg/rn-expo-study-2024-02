import React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import Color from 'color';

import { useColors, useUIColors } from '../../../../contexts';
import { EDIT_BUTTON_CONTAINER_WIDTH } from '../consts';
import AddButton from '../icons/AddButton';
import RemoveButton from '../icons/RemoveButton';
import SelectedButton from '../icons/SelectedButton';
import UnselectedButton from '../icons/UnselectedButton';
import type { Props as ListItemProps } from '../ListItem';
import { useListItemAnimationContext } from '../ListItemAnimationContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Props = {
  editButton?: ListItemProps['editButton'];
  onEditButtonPress?: ListItemProps['onEditButtonPress'];
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
    const uiColors = useUIColors();

    const { editButtonOpacityAnim, renderEditButtonForAnim } =
      useListItemAnimationContext();

    const editButtonToRender = editButton || renderEditButtonForAnim;

    if (!editButtonToRender) return null;

    return (
      <AnimatedPressable
        style={[
          styles.editButtonContainer,
          {
            opacity: editButtonOpacityAnim,
          },
        ]}
        onPress={() => {
          onEditButtonPress?.();
        }}
      >
        {({ pressed }) => {
          switch (editButtonToRender) {
            case 'unselected':
              return <UnselectedButton fill={uiColors.systemGray3} />;
            case 'selected':
              return (
                <SelectedButton
                  fill={
                    pressed
                      ? Color(colors.blue).darken(0.4).hexa()
                      : colors.blue
                  }
                />
              );
            case 'add':
              return (
                <AddButton
                  fill={
                    pressed
                      ? Color(colors.green).darken(0.4).hexa()
                      : colors.green
                  }
                />
              );
            case 'remove':
              return (
                <RemoveButton
                  fill={
                    pressed ? Color(colors.red).darken(0.4).hexa() : colors.red
                  }
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
    paddingRight: 12,
    justifyContent: 'center',
  },
});

export default EditButton;
