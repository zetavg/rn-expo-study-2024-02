import React from 'react';

import {
  GroupLevelContext,
  IsGroupedBackgroundContext,
  useGroupLevel,
  useIsGroupedBackground,
} from '../contexts';
import { useBackgroundColor } from '../hooks';

/**
 * This component can be used in components that uses context-aware background colors.
 *
 * It increases the group level by 1 for the children components, so that children that also uses the `BackgroundColor` component or the `useBackgroundColor` hook will be able to use the color that corresponds to the correct group level.
 */
export function BackgroundColor({
  grouped,
  root,
  children,
  doNotIncreaseGroupLevelForChildren,
}: {
  /** Whether to use *grouped* background colors. In general, grouped background colors should be used when you have a grouped table view. See: https://developer.apple.com/design/human-interface-guidelines/color#iOS-iPadOS. */
  grouped?: boolean;
  /** Whether this should be the root of your view - setting this will reset the group level context */
  root?: boolean;
  children: (backgroundColor: string) => React.ReactNode;
  doNotIncreaseGroupLevelForChildren?: boolean;
}) {
  const isGroupedBackgroundFromContext = useIsGroupedBackground();
  const groupLevelFromContext = useGroupLevel();

  const isGroupedBackground = grouped ?? isGroupedBackgroundFromContext;
  const groupLevel = (root ? undefined : groupLevelFromContext) ?? -1;

  const backgroundColor = useBackgroundColor({
    grouped: isGroupedBackground,
    level: groupLevel + 1,
  });

  let content = children(backgroundColor);

  if (doNotIncreaseGroupLevelForChildren !== true) {
    content = (
      <GroupLevelContext.Provider value={groupLevel + 1}>
        {content}
      </GroupLevelContext.Provider>
    );
  }

  if (grouped !== undefined) {
    content = (
      <IsGroupedBackgroundContext.Provider value={grouped}>
        {content}
      </IsGroupedBackgroundContext.Provider>
    );
  }

  return content;
}

export default BackgroundColor;
