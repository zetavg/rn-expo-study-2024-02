import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text as RNText,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  HandlerStateChangeEvent,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Color from 'color';
import { BlurView } from 'expo-blur';

import { Icon, IconPropsContext } from '@rnstudy/react-icons';
import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import { useColors, useTextStyles, useUIColors } from '../../../contexts';
import { Colors } from '../../../tokens/colors/types';
import { textStyles } from '../../../tokens/text-styles';
import BackgroundColor from '../../BackgroundColor';
import Select, { SelectPropsContext } from '../../Select';
import Text, { TextPropsContext } from '../../Text';

import ContentContainer from './components/ContentContainer';
import DrillInIcon from './components/DrillInIcon';
import EditButton from './components/EditButton';
import Grabber from './components/Grabber';
import Image from './components/Image';
import MainContentsContainer from './components/MainContentsContainer';
import OuterContainer from './components/OuterContainer';
import TitleAndSubtitle from './components/TitleAndSubtitle';
import TitleAndTrailingContentsContainer from './components/TitleAndTrailingContentsContainer';
import TrailingContents from './components/TrailingContents';
import {
  ListItemAnimationContext,
  ListItemAnimationContextProvider,
} from './ListItemAnimationContext';
import { getListItemHeight } from './utils';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const LAYOUT_ANIMATION_DURATION = 200;

const SLIDE_BUTTON_WIDTH = 74;

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  /** The style of the list. */
  listStyle?: ListStyle;

  listPosition?: 'first' | 'middle' | 'last' | 'only';

  editButton?: 'unselected' | 'selected' | 'add' | 'remove';

  icon?: ReactNodePropWithPropDefaultValuesContext<{
    iconProps: Partial<React.ComponentProps<typeof Icon>>;
    backgroundColor: string;
  }>;

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

  /** The text to display on the right side of the list item. Will be ignored if `accessories` is provided. */
  detail?: string;

  /** The accessories to display on the right side of the list item, such as icon, switch, select or other components. */
  accessories?: ReactNodePropWithPropDefaultValuesContext<{
    textProps: Partial<React.ComponentProps<typeof Text>>;
    selectProps: Partial<React.ComponentProps<typeof Select>>;
  }>;

  /** Compact style, use a smaller font size for subtitle and decrease vertical padding. */
  compact?: boolean;
  /** Display the subtitle on top of the title. */
  subtitleOnTop?: boolean;
  /** Display the list item as a button. */
  button?: boolean;
  /** Displays a navigation arrow on the right side of the list item if set to true. */
  navigationLink?: boolean;

  onPress?: () => void;
  onLongPress?: () => void;
  onEditButtonPress?: () => void;

  /** Show a grabber on the right side of the list item. */
  showGrabber?: boolean;
  grabberProps?: React.ComponentProps<typeof AnimatedPressable>;
  onGrabberActive?: () => void;
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

  children?: React.ReactNode;
};

export function ListItem(props: Props) {
  const { listStyle = 'insetGrouped', listPosition = 'only' } = props;

  const windowDimensions = useWindowDimensions();

  const minHeight = getListItemHeight({
    subtitle: props.subtitle,
    compact: props.compact,
    fontScale: windowDimensions.fontScale,
  });

  return (
    <ListItemAnimationContextProvider showGrabber={props.showGrabber}>
      <BackgroundColor>
        {(backgroundColor) => (
          <OuterContainer
            listStyle={listStyle}
            listPosition={listPosition}
            dragActive={props.dragActive}
            backgroundColor={backgroundColor}
          >
            <ContentContainer
              listStyle={listStyle}
              onPress={props.onPress}
              onLongPress={props.onLongPress}
              minHeight={minHeight}
              height={props.fixedHeight ? props.height || minHeight : undefined}
              dragActive={props.dragActive}
              backgroundColor={backgroundColor}
            >
              {/* {!!props.editButton && <EditButton />} */}
              {!!props.icon && (
                <Image
                  icon={props.icon}
                  subtitle={props.subtitle}
                  compact={props.compact}
                  backgroundColor={backgroundColor}
                />
              )}
              <MainContentsContainer
                listStyle={listStyle}
                listPosition={listPosition}
                dragActive={props.dragActive}
              >
                {!!(
                  props.title ||
                  props.subtitle ||
                  props.accessories ||
                  props.detail
                ) && (
                  <TitleAndTrailingContentsContainer>
                    <TitleAndSubtitle
                      title={props.title}
                      subtitle={props.subtitle}
                      compact={props.compact}
                      subtitleOnTop={props.subtitleOnTop}
                      button={props.button}
                      fixedHeight={props.fixedHeight}
                    />
                    <TrailingContents
                      accessories={props.accessories}
                      detail={props.detail}
                    />
                    {props.navigationLink && <DrillInIcon />}
                  </TitleAndTrailingContentsContainer>
                )}

                {props.children}
              </MainContentsContainer>

              <Grabber
                key="grabber"
                listStyle={listStyle}
                showGrabber={props.showGrabber}
                onGrabberActive={props.onGrabberActive}
                dragActive={props.dragActive}
                navigationLink={props.navigationLink}
                hasAccessories={!!props.accessories}
                backgroundColor={backgroundColor}
              />
            </ContentContainer>
          </OuterContainer>
        )}
      </BackgroundColor>
    </ListItemAnimationContextProvider>
  );
}

export default ListItem;
