import React from 'react';

import {
  GroupLevelContext,
  IsGroupedBackgroundContext,
  useGroupLevel,
} from '../contexts';
import { useBackgroundColor } from '../hooks';
import { Color } from '../tokens';

/**
 * This component can be used to render the UI tree with the correct background color, or be used within a group component to get the current background color based on the group level.
 *
 * It increases the group level by 1 for the children components.
 */
export function WithBackgroundColor({
  grouped,
  children,
}: {
  /** Whether to use *grouped* background colors. In general, grouped background colors should be used when you have a grouped table view. */
  grouped?: boolean;
  children: (backgroundColor: Color) => React.ReactNode;
}) {
  const groupLevel = useGroupLevel();

  const backgroundColor = useBackgroundColor({ grouped });
  const content = (
    <GroupLevelContext.Provider
      value={groupLevel === undefined ? 0 : groupLevel + 1}
    >
      {children(backgroundColor)}
    </GroupLevelContext.Provider>
  );

  if (grouped !== undefined) {
    return (
      <IsGroupedBackgroundContext.Provider value={grouped}>
        {content}
      </IsGroupedBackgroundContext.Provider>
    );
  }

  return content;
}

export default WithBackgroundColor;
