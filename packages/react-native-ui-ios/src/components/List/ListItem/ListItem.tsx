import React, { useRef } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Icon } from '@rnstudy/react-icons';
import {
  assignDefaults,
  type ReactNodePropWithPropDefaultValuesContext,
  usePropsWithContextualDefaultValues,
} from '@rnstudy/react-utils';

import BackgroundColor from '../../BackgroundColor';
import Select from '../../Select';
import Text from '../../Text';

import ContentContainer from './components/ContentContainer';
import DrillInIcon from './components/DrillInIcon';
import EditButton, {
  propsSelector as editButtonPropsSelector,
} from './components/EditButton';
import Grabber, {
  propsSelector as grabberPropsSelector,
} from './components/Grabber';
import Image from './components/Image';
import MainContentsContainer from './components/MainContentsContainer';
import OuterContainer from './components/OuterContainer';
import TitleAndSubtitle, {
  propsSelector as tasPropsSelector,
} from './components/TitleAndSubtitle';
import TitleAndTrailingContentsContainer from './components/TitleAndTrailingContentsContainer';
import TrailingContents from './components/TrailingContents';
import { ListItemAnimationContextProvider } from './ListItemAnimationContext';
import ListItemPropsContext from './ListItemPropsContext';
import { getListItemHeight } from './utils';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

type PositionInList = 'first' | 'middle' | 'last' | 'only';

export type Props = {
  /** The style of the list. */
  listStyle?: ListStyle;

  /** The position of the list item in the list. */
  listPosition?: PositionInList;

  /** Show a edit button in front of the list item. */
  editButton?: 'unselected' | 'selected' | 'add' | 'remove';
  onEditButtonPress?: () => void;

  /** The icon to display in front of the list item. */
  icon?: ReactNodePropWithPropDefaultValuesContext<{
    iconProps: Partial<React.ComponentProps<typeof Icon>>;
    backgroundColor: string;
  }>;
  /** Align the icon with the title. Will only take effect when `children` is provided. */
  alignIconWithTitle?: boolean;

  /** The text to display as the title. */
  title:
    | string
    | ReactNodePropWithPropDefaultValuesContext<{
        textProps: Partial<React.ComponentProps<typeof Text>>;
      }>;
  /** The text to display below the title. */
  subtitle?:
    | string
    | ReactNodePropWithPropDefaultValuesContext<{
        textProps: Partial<React.ComponentProps<typeof Text>>;
      }>;

  /** Display the title and subtitle as a single line. */
  singleLine?: boolean;

  /** The text to display on the right side of the list item. Will be ignored if `accessories` is provided. */
  detail?: string;

  /** The accessories to display on the right side of the list item, such as icon, switch, select or other components. */
  accessories?: ReactNodePropWithPropDefaultValuesContext<{
    textProps: Partial<React.ComponentProps<typeof Text>>;
    selectProps: Partial<React.ComponentProps<typeof Select>>;
  }>;

  onPress?: () => void;
  onLongPress?: () => void;

  /** Compact style, use a smaller font size for subtitle and decrease vertical padding. */
  compact?: boolean;
  /** Display the subtitle on top of the title. */
  subtitleOnTop?: boolean;
  /** Display the list item as a button. */
  button?: boolean;
  /** Displays a navigation arrow on the right side of the list item if set to true. */
  navigationLink?: boolean;

  /** Hides the trailing contents in the item. This is useful for hiding the trailing contents from items while the list is in edit mode (when `showGrabber` or `editButton` is set to `true`). */
  hideTrailingContents?: boolean;
  /** Disables the `onPress` on `onLongPress` events and removes the highlight effect when pressed, without giving the item a disabled appearance. This is useful for removing the pressable behavior from items while the list is in edit mode (when `showGrabber` or `editButton` is set to `true`). */
  disableOnPress?: boolean;

  /** Show a grabber on the right side of the list item. */
  showGrabber?: boolean;
  /** Callback when the grabber is held by the user. Use this to activate the drag. */
  onGrabberHold?: () => void;
  /** Render this item as it is being dragged. */
  dragActive?: boolean;

  /**
   * Setting this to `true` will let the list item have a fixed height instead of dynamically adjusting the height based on the content, forcing the title and subtitle to show on one line and truncate overflowed text.
   *
   * This is useful while rendering items in a virtualized list with the `getItemLayout` prop.
   *
   * Use this with the `getListItemHeight` utility function to get the expected height of the list item under different conditions, or the `height` prop to specify the height manually.
   */
  fixedHeight?: boolean;
  /** Specify the height of the list item. This will only work if `fixedHeight` is set to `true`. */
  height?: number;

  /** Additional content to render inside the list item. This will be rendered below of the title, subtitle and accessories. */
  children?: React.ReactNode;
};

const DEFAULT_PROPS = {
  listStyle: 'insetGrouped' as ListStyle,
  listPosition: 'only' as PositionInList,
};

export function ListItem(rawProps: Props) {
  const props = assignDefaults(
    usePropsWithContextualDefaultValues(rawProps, ListItemPropsContext),
    DEFAULT_PROPS,
  );

  const windowDimensions = useWindowDimensions();

  const minHeight = getListItemHeight({
    subtitle: props.subtitle,
    compact: props.compact,
    fontScale: windowDimensions.fontScale,
  });

  const childrenHeightAnim = useRef(new Animated.Value(0)).current;

  return (
    <ListItemAnimationContextProvider {...props}>
      <BackgroundColor>
        {(backgroundColor) => (
          <OuterContainer {...props} backgroundColor={backgroundColor}>
            <ContentContainer
              {...props}
              minHeight={minHeight}
              height={props.fixedHeight ? props.height || minHeight : undefined}
              backgroundColor={backgroundColor}
            >
              <EditButton {...editButtonPropsSelector(props)} />

              {!!props.icon && (
                <Image
                  {...props}
                  backgroundColor={backgroundColor}
                  style={
                    props.alignIconWithTitle && props.children
                      ? { marginBottom: childrenHeightAnim }
                      : undefined
                  }
                />
              )}

              <MainContentsContainer {...props}>
                {!!(
                  props.title ||
                  props.subtitle ||
                  props.accessories ||
                  props.detail
                ) && (
                  <TitleAndTrailingContentsContainer>
                    <TitleAndSubtitle {...tasPropsSelector(props)} />

                    {!props.hideTrailingContents && (
                      <TrailingContents
                        accessories={props.accessories}
                        detail={props.detail}
                      />
                    )}

                    {props.navigationLink && (
                      <DrillInIcon hide={props.hideTrailingContents} />
                    )}
                  </TitleAndTrailingContentsContainer>
                )}

                {!!props.children && (
                  <View
                    style={styles.childrenContainer}
                    onLayout={(e) => {
                      childrenHeightAnim.setValue(e.nativeEvent.layout.height);
                    }}
                  >
                    {props.children}
                  </View>
                )}
              </MainContentsContainer>

              <Grabber
                key="grabber"
                {...grabberPropsSelector(props)}
                backgroundColor={backgroundColor}
              />
            </ContentContainer>
          </OuterContainer>
        )}
      </BackgroundColor>
    </ListItemAnimationContextProvider>
  );
}

const styles = StyleSheet.create({
  childrenContainer: {
    flex: 1,
    paddingBottom: 12,
  },
});

export default ListItem;
