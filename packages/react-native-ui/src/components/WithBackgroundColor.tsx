import React from 'react';

import {
  IsGroupedBackgroundContext as IsGroupedBackgroundContextIOS,
  useGroupLevel as useGroupLevelIOS,
} from '@rnstudy/react-native-ui-ios';

import { GroupLevelContextProvider } from '../contexts/GroupLevelContext';
import { useGroupLevelMD3 } from '../contexts/GroupLevelContextMD3';
import IsGroupedBackgroundContextMD3 from '../contexts/IsGroupedBackgroundContextMD3';
import useBackgroundColor from '../hooks/useBackgroundColor';

/**
 * This component can be used to render the UI tree with the correct background color, or be used within a group component to get the current background color based on the group level.
 *
 * It increases the group level by 1 for the children components.
 */
export function WithBackgroundColor({
  grouped,
  children,
}: {
  /**
   * Whether to use *grouped* background colors on iOS. In general, grouped background colors should be used when you have a grouped table view.
   *
   * This has no effect on Android.
   * */
  grouped?: boolean;
  children: (backgroundColor: string) => React.ReactNode;
}) {
  const iosGroupLevel = useGroupLevelIOS();
  const md3GroupLevel = useGroupLevelMD3();

  const backgroundColor = useBackgroundColor({ grouped });
  const content = (
    <GroupLevelContextProvider
      iosValue={iosGroupLevel === undefined ? 0 : iosGroupLevel + 1}
      md3Value={md3GroupLevel === undefined ? 0 : md3GroupLevel + 1}
    >
      {children(backgroundColor)}
    </GroupLevelContextProvider>
  );

  if (grouped !== undefined) {
    return (
      <IsGroupedBackgroundContextMD3.Provider value={grouped}>
        <IsGroupedBackgroundContextIOS.Provider value={grouped}>
          {content}
        </IsGroupedBackgroundContextIOS.Provider>
      </IsGroupedBackgroundContextMD3.Provider>
    );
  }

  return content;
}

export default WithBackgroundColor;
