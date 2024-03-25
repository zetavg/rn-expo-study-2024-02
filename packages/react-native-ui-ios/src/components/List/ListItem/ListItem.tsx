import React from 'react';
import { useWindowDimensions } from 'react-native';

import { Icon } from '@rnstudy/react-icons';
import {
  type ReactNodePropWithPropDefaultValuesContext,
  usePropsWithContextualDefaultValues,
} from '@rnstudy/react-utils';

import BackgroundColor from '../../BackgroundColor';
import Select from '../../Select';
import Text from '../../Text';

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
import { ListItemAnimationContextProvider } from './ListItemAnimationContext';
import ListItemPropsContext from './ListItemPropsContext';
import { getListItemHeight } from './utils';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  /** The style of the list. */
  listStyle?: ListStyle;

  /** The position of the list item in the list. */
  listPosition?: 'first' | 'middle' | 'last' | 'only';

  /** Show a edit button in front of the list item. */
  editButton?: 'unselected' | 'selected' | 'add' | 'remove';
  onEditButtonPress?: () => void;

  /** The icon to display in front of the list item. */
  icon?: ReactNodePropWithPropDefaultValuesContext<{
    iconProps: Partial<React.ComponentProps<typeof Icon>>;
    backgroundColor: string;
  }>;

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

export function ListItem(props: Props) {
  const {
    listStyle = 'insetGrouped',
    listPosition = 'only',
    ...p
  } = usePropsWithContextualDefaultValues(props, ListItemPropsContext);

  const windowDimensions = useWindowDimensions();

  const minHeight = getListItemHeight({
    subtitle: props.subtitle,
    compact: props.compact,
    fontScale: windowDimensions.fontScale,
  });

  return (
    <ListItemAnimationContextProvider
      editButton={p.editButton}
      showGrabber={p.showGrabber}
      hideTrailingContents={p.hideTrailingContents}
    >
      <BackgroundColor>
        {(backgroundColor) => (
          <OuterContainer
            listStyle={listStyle}
            listPosition={listPosition}
            dragActive={p.dragActive}
            backgroundColor={backgroundColor}
          >
            <ContentContainer
              listStyle={listStyle}
              onPress={p.onPress}
              onLongPress={p.onLongPress}
              minHeight={minHeight}
              height={p.fixedHeight ? p.height || minHeight : undefined}
              disableOnPress={p.disableOnPress}
              dragActive={p.dragActive}
              backgroundColor={backgroundColor}
            >
              <EditButton
                editButton={p.editButton}
                onEditButtonPress={p.onEditButtonPress}
              />
              {!!p.icon && (
                <Image
                  icon={p.icon}
                  subtitle={p.subtitle}
                  compact={p.compact}
                  backgroundColor={backgroundColor}
                />
              )}
              <MainContentsContainer
                listStyle={listStyle}
                listPosition={listPosition}
                dragActive={p.dragActive}
              >
                {!!(p.title || p.subtitle || p.accessories || p.detail) && (
                  <TitleAndTrailingContentsContainer>
                    <TitleAndSubtitle
                      title={p.title}
                      subtitle={p.subtitle}
                      compact={p.compact}
                      subtitleOnTop={p.subtitleOnTop}
                      button={p.button}
                      fixedHeight={p.fixedHeight}
                    />
                    {!p.hideTrailingContents && (
                      <TrailingContents
                        accessories={p.accessories}
                        detail={p.detail}
                      />
                    )}
                    {p.navigationLink && (
                      <DrillInIcon hide={p.hideTrailingContents} />
                    )}
                  </TitleAndTrailingContentsContainer>
                )}

                {p.children}
              </MainContentsContainer>

              <Grabber
                key="grabber"
                listStyle={listStyle}
                showGrabber={p.showGrabber}
                onGrabberHold={p.onGrabberHold}
                dragActive={p.dragActive}
                navigationLink={p.navigationLink}
                hideTrailingContents={p.hideTrailingContents}
                hasAccessories={!!p.accessories}
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
