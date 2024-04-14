import React, { useRef } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Icon } from '@rnstudy/react-icons';
import {
  assignDefaults,
  type ReactNodePropWithPropDefaultValuesContext,
  usePropsWithContextualDefaultValues,
} from '@rnstudy/react-utils';

import ActivityIndicator from '../../ActivityIndicator';
import BackgroundColor from '../../BackgroundColor';
import { type SegmentedControlProps } from '../../SegmentedControl';
import { type SelectProps } from '../../Select';
import Text, { type TextProps } from '../../Text';
import { type TextInputProps } from '../../TextInput';
import ListPropsContext from '../ListPropsContext';
import { type ListProps } from '..';

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
import TrailingContents, {
  propsSelector as tcPropsSelector,
} from './components/TrailingContents';
import AccessoryButton from './AccessoryButton';
import { CHILDREN_CONTAINER_PADDING_VERTICAL } from './consts';
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

  /** The icon or image to display in front of the list item. */
  image?: ReactNodePropWithPropDefaultValuesContext<{
    iconProps: Partial<React.ComponentProps<typeof Icon>>;
    backgroundColor: string;
  }>;
  /** Align the image with the title. Will only take effect when `children` is provided. */
  alignImageWithTitle?: boolean;

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

  /** Shows a check mark on the item. Will be ignored if `accessories` is provided. */
  checked?: boolean;

  /** The accessories to display on the right side of the list item, such as icon, switch, select or other components. */
  accessories?: ReactNodePropWithPropDefaultValuesContext<{
    textProps: Partial<TextProps>;
    textInputProps: Partial<TextInputProps>;
    selectProps: Partial<SelectProps<string>>;
    segmentedControlProps: Partial<SegmentedControlProps<string>>;
    iconProps: Partial<React.ComponentProps<typeof Icon>>;
  }>;

  /** Set this to `true` if you are using a text input in the accessories of the list item. This will prioritize space distribution for the text input. */
  accessoriesContainsTextInput?: boolean;

  onPress?: () => void;
  onLongPress?: () => void;

  /** Compact style, use a smaller font size for subtitle and decrease vertical padding. */
  compact?: boolean;
  /** Display the subtitle on top of the title. */
  subtitleOnTop?: boolean;
  /** Display the list item as a button. */
  button?: boolean;
  /** An option indicating the button will trigger a destructive action. */
  destructive?: boolean;
  /** Disable the item button. This will also disable the `onPress` and `onLongPress` events and remove the highlight effect when pressed. */
  disabled?: boolean;
  /** Displays a navigation arrow on the right side of the list item if set to true. */
  navigationLink?: boolean;

  /** Show a loading indicator over the list item. */
  loading?: boolean;

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

  /** Whether to shrink the vertical space of the title when the children has enough height to reach the minimum height of the list item. */
  shrinkTitleVertical?: boolean;

  /** A private prop to indicate that the list item is being used inside a `List` component, which will remove the margin, background color, outer border radius, top border of the first item and bottom border of the last item as they will be handled by the `List` component. */
  _isInListComponent?: boolean;

  /** Private prop indicating that the list item is nested inside a list item. */
  _isNested?: boolean;
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

  const titleAndTrailingContentsContainerHeightAnim = useRef(
    new Animated.Value(0),
  ).current;
  const titleAndTrailingContentsContainerYAnim = useRef(
    new Animated.Value(0),
  ).current;

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

              {!!props.image && (
                <Image
                  {...props}
                  backgroundColor={backgroundColor}
                  titleAndTrailingContentsContainerHeightAnim={
                    titleAndTrailingContentsContainerHeightAnim
                  }
                  titleAndTrailingContentsContainerYAnim={
                    titleAndTrailingContentsContainerYAnim
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
                  <TitleAndTrailingContentsContainer
                    onLayout={(e) => {
                      titleAndTrailingContentsContainerYAnim.setValue(
                        e.nativeEvent.layout.y,
                      );
                      titleAndTrailingContentsContainerHeightAnim.setValue(
                        e.nativeEvent.layout.height,
                      );
                    }}
                  >
                    <TitleAndSubtitle
                      {...tasPropsSelector(props)}
                      minHeight={
                        props.shrinkTitleVertical ? undefined : minHeight
                      }
                    />

                    {!props.hideTrailingContents && (
                      <TrailingContents {...tcPropsSelector(props)} />
                    )}

                    {props.navigationLink && (
                      <DrillInIcon hide={props.hideTrailingContents} />
                    )}
                  </TitleAndTrailingContentsContainer>
                )}

                {!!props.children && (
                  <View
                    style={[
                      styles.childrenContainer,
                      !!props.title && styles.childrenContainer_withTitle,
                    ]}
                    // onLayout={(e) => {
                    //   childrenHeightAnim.setValue(e.nativeEvent.layout.height);
                    // }}
                  >
                    <ListPropsContext.Provider value={NESTED_LIST_PROPS}>
                      {props.children}
                    </ListPropsContext.Provider>
                  </View>
                )}
              </MainContentsContainer>

              <Grabber
                key="grabber"
                {...grabberPropsSelector(props)}
                backgroundColor={backgroundColor}
              />

              {props.loading && (
                <View style={styles.activityIndicatorOverlay}>
                  <ActivityIndicator />
                </View>
              )}
            </ContentContainer>
          </OuterContainer>
        )}
      </BackgroundColor>
    </ListItemAnimationContextProvider>
  );
}

ListItem.AccessoryButton = AccessoryButton;

const NESTED_LIST_PROPS: Partial<ListProps> = {
  _isNested: true,
};

const styles = StyleSheet.create({
  childrenContainer: {
    flex: 1,
    paddingVertical: CHILDREN_CONTAINER_PADDING_VERTICAL,
    justifyContent: 'center',
  },
  childrenContainer_withTitle: {
    paddingTop: 0,
  },
  activityIndicatorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
