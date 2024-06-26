import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Icon } from '@rnstudy/react-icons';
import {
  ListItem as ListItemIOS,
  listItemChildrenPaddingCancelingStyle as listItemChildrenPaddingCancelingStyleIOS,
} from '@rnstudy/react-native-ui-ios';
import {
  ListItem as ListItemMD3,
  listItemChildrenPaddingCancelingStyle as listItemChildrenPaddingCancelingStyleMD3,
} from '@rnstudy/react-native-ui-md3';
import {
  reactMemoWithPropsThatCanBeMarkedAsStable,
  type ReactNodePropWithPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import { useUIPlatform } from '../../../contexts';

import AccessoryButton from './AccessoryButton';

type ListStyle = 'plain' | 'grouped' | 'insetGrouped';

export type Props = {
  /** The style of the list. */
  listStyle?: ListStyle;

  /** The position of the list item in the list. */
  listPosition?: 'first' | 'middle' | 'last' | 'only';

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
  title: string | React.ReactNode;
  /** The text to display below the title. */
  subtitle?: string | React.ReactNode;

  /** Display the title and subtitle as a single line. Defaults to `true` on Android and `false` on iOS. */
  singleLine?: boolean;

  /** The text to display on the right side of the list item. Will be ignored if `accessories` is provided. */
  detail?: string;

  /** Shows a check mark on the item. Will be ignored if `accessories` is provided. */
  checked?: boolean;

  /**
   * The accessories to display on the right side of the list item, such as icon, switch, select or other components.
   *
   * Note: If you are using a `TextInput` in the accessories, you may also want to set the `accessoriesContainsTextInput` prop to `true` to prioritize space distribution for the text input.
   */
  accessories?: React.ReactNode;

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
  /** Displays a navigation arrow on the right side of the list item if set to true. This has no effect on Android. */
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

  /** Whether to shrink the vertical space of the title when the children has enough height to reach the minimum height of the list item. */
  shrinkTitleVertical?: boolean;

  inverted?: boolean;

  /** Additional content to render inside the list item. This will be rendered below of the title, subtitle and accessories. */
  children?: React.ReactNode;
};

export function ListItem(props: Props) {
  const uiPlatform = useUIPlatform();

  switch (uiPlatform) {
    case 'ios': {
      return <ListItemIOS {...props} />;
    }
    case 'android': {
      return <ListItemMD3 {...props} />;
    }
  }
}

ListItem.AccessoryButton = AccessoryButton;

ListItem.ChildrenPaddingCancelingContainer =
  function ChildrenPaddingCancelingContainer({
    style,
    children,
  }: {
    style: StyleProp<ViewStyle>;
    children: React.ReactNode;
  }) {
    const uiPlatform = useUIPlatform();

    const listItemChildrenPaddingCancelingStyle = (() => {
      switch (uiPlatform) {
        case 'ios':
          return listItemChildrenPaddingCancelingStyleIOS;

        case 'android':
          return listItemChildrenPaddingCancelingStyleMD3;
      }
    })();

    return (
      <View style={[listItemChildrenPaddingCancelingStyle, style]}>
        {children}
      </View>
    );
  };

/**
 * `ListItem` wrapped with `React.memo`.
 */
ListItem.Memoized = reactMemoWithPropsThatCanBeMarkedAsStable(ListItem, [
  'title',
  'subtitle',
  'onPress',
  'onLongPress',
]);

export default ListItem;
