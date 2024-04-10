import React from 'react';

import {
  GroupLevelContext,
  IsGroupedBackgroundContext,
  useGroupLevel,
  useIsGroupedBackground,
} from '../contexts';
import { useBackgroundColor } from '../hooks';
import { Color } from '../tokens';
import IsElevatedBackgroundContext, { useIsElevatedBackground } from '../contexts/IsElevatedBackgroundContext';

/**
 * This component can be used in components that uses context-aware background colors.
 *
 * It increases the group level by 1 for the children components, so that children that also uses the `BackgroundColor` component or the `useBackgroundColor` hook will be able to use the color that corresponds to the correct group level.
 */
export function BackgroundColor({
  grouped,
  root,
  elevated,
  children,
}: {
  /** Whether to use *grouped* background colors. In general, grouped background colors should be used when you have a grouped table view. See: https://developer.apple.com/design/human-interface-guidelines/color#iOS-iPadOS. */
  grouped?: boolean;
  /** Whether this should be the root of your view - setting this will reset the group level context */
  root?: boolean;
  elevated?: boolean;
  children: (backgroundColor: Color) => React.ReactNode;
}) {
  const isGroupedBackgroundFromContext = useIsGroupedBackground();
  const groupLevelFromContext = useGroupLevel();
  const isElevatedBackgroundFromContext = useIsElevatedBackground();

  const isGroupedBackground = grouped ?? isGroupedBackgroundFromContext;
  const groupLevel = (root ? undefined : groupLevelFromContext) ?? -1;
  const isElevatedBackground = elevated ?? isElevatedBackgroundFromContext;

  const backgroundColor = useBackgroundColor({
    grouped: isGroupedBackground,
    level: groupLevel + 1,
    elevated: isElevatedBackground,
  });

  let content = (
    <GroupLevelContext.Provider value={groupLevel + 1}>
      {children(backgroundColor)}
    </GroupLevelContext.Provider>
  );

  if (grouped !== undefined) {
    content = (
      <IsGroupedBackgroundContext.Provider value={grouped}>
        {content}
      </IsGroupedBackgroundContext.Provider>
    );
  }

  if (elevated !== undefined) {
    content = (
      <IsElevatedBackgroundContext.Provider value={elevated}>
        {content}
      </IsElevatedBackgroundContext.Provider>
    );
  }

  return content;
}

export default BackgroundColor;
