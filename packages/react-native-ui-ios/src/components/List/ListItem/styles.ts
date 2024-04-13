import {
  CHILDREN_CONTAINER_PADDING_VERTICAL,
  MAIN_CONTENTS_CONTAINER_PADDING_END,
} from './consts';

/**
 * The style for canceling the padding of the children of the list item with negative margins.
 */
export const listItemChildrenPaddingCancelingStyle = {
  marginBottom: -CHILDREN_CONTAINER_PADDING_VERTICAL,
  marginEnd: -MAIN_CONTENTS_CONTAINER_PADDING_END,
};
