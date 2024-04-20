import { createContext, useContext, useMemo } from 'react';

import { withLayoutAnimation } from '@rnstudy/react-native-ui';

import { ExampleApps } from '.';

type SetExampleAppFn = (key: keyof ExampleApps | null) => void;

export const SetExampleAppContext = createContext<SetExampleAppFn | null>(null);

export const useSetExampleApp = (): SetExampleAppFn => {
  const setExampleApp = useContext(SetExampleAppContext);
  if (!setExampleApp) {
    throw new Error(
      'useSetExampleApp must be used within SetExampleAppProvider',
    );
  }
  return useMemo(() => withLayoutAnimation(setExampleApp), [setExampleApp]);
};
