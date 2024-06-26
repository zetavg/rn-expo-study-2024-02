import React, { useCallback, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

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
import { DEFAULT_LIST_STYLE } from '../consts';
import { ListPropsContext } from '../ListPropsContext';

import ContentContainer from './components/ContentContainer';
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
import { CONTAINER_PADDING_VERTICAL } from './consts';
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
  /** Align the image with the title. */
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

  /** Display the title and subtitle as a single line. Defaults to `false`. */
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
  /** Force accessories to be vertically aligned to the center, regardless if the list item has multiple lines or not. */
  accessoriesVerticalAlignCenter?: boolean;

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

  inverted?: boolean;

  /** A private prop to indicate that the list item is being used inside a `List` component, which will remove the margin, background color, outer border radius, top border of the first item and bottom border of the last item as they will be handled by the `List` component. */
  _isInListComponent?: boolean;

  /** Private prop indicating that the list item is nested inside a list item. */
  _isNested?: boolean;
};

const DEFAULT_PROPS = {
  listStyle: DEFAULT_LIST_STYLE,
  listPosition: 'only' as PositionInList,
  singleLine: false,
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

  const imageShouldAlignWithTitle =
    props.alignImageWithTitle ||
    (props.alignImageWithTitle !== false &&
      ((!props.singleLine && !!props.subtitle) || !!props.children));

  const titleTextYAnim = useRef(new Animated.Value(0)).current;
  const titleTextHeightAnim = useRef(new Animated.Value(0)).current;
  const titleContainerYAnim = useRef(new Animated.Value(0)).current;
  const titleParentContainerYAnim = useRef(
    new Animated.Value(CONTAINER_PADDING_VERTICAL),
  ).current;

  const titleTextYRelatedToContainerAnim = useRef(
    Animated.add(
      Animated.add(titleContainerYAnim, titleParentContainerYAnim),
      titleTextYAnim,
    ),
  ).current;

  const handleTitleTextLayout = useCallback(
    (event: LayoutChangeEvent) => {
      titleTextYAnim.setValue(event.nativeEvent.layout.y);
      titleTextHeightAnim.setValue(event.nativeEvent.layout.height);
    },
    [titleTextYAnim, titleTextHeightAnim],
  );
  const handleTitleContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      titleContainerYAnim.setValue(event.nativeEvent.layout.y);
    },
    [titleContainerYAnim],
  );
  const handleTitleParentContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      titleParentContainerYAnim.setValue(event.nativeEvent.layout.y);
    },
    [titleParentContainerYAnim],
  );

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
                  imageShouldAlignWithTitle={imageShouldAlignWithTitle}
                  titleTextYAnim={titleTextYRelatedToContainerAnim}
                  titleTextHeightAnim={titleTextHeightAnim}
                />
              )}

              <MainContentsContainer {...props}>
                {
                  // Using an array here since `React.Children.count(children)` is used in MainContentsContainer
                  [
                    !!props.title && (
                      <TitleAndTrailingContentsContainer
                        key="TitleAndTrailingContentsContainer"
                        onLayout={handleTitleParentContainerLayout}
                      >
                        <TitleAndSubtitle
                          {...tasPropsSelector(props)}
                          onLayout={handleTitleContainerLayout}
                          onTitleTextLayout={handleTitleTextLayout}
                          minHeight={
                            props.shrinkTitleVertical
                              ? undefined
                              : minHeight - CONTAINER_PADDING_VERTICAL * 2
                          }
                        />

                        {!props.hideTrailingContents && (
                          <TrailingContents {...tcPropsSelector(props)} />
                        )}
                      </TitleAndTrailingContentsContainer>
                    ),
                    !!props.children && (
                      <View
                        key="ChildrenContainer"
                        style={styles.childrenContainer}
                      >
                        <ListPropsContext.Provider value={NESTED_LIST_PROPS}>
                          {props.children}
                        </ListPropsContext.Provider>
                      </View>
                    ),
                  ].filter((e) => !!e)
                }
              </MainContentsContainer>

              <Grabber
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

const NESTED_LIST_PROPS: React.ContextType<typeof ListPropsContext> = {
  _isNested: true,
};

const styles = StyleSheet.create({
  childrenContainer: {
    flex: 1,
  },
  activityIndicatorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
