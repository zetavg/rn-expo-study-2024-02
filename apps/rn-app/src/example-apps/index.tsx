import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NAVIGATION_EXAMPLES } from '@rnstudy/react-native-navigation';
import { withLayoutAnimation } from '@rnstudy/react-native-ui';

import { SetExampleAppContext } from './contexts';

type ExampleAppDefn = {
  title: string;
  component: React.ComponentType<{ exit?: () => void }>;
};

function exampleAppDefn(defn: ExampleAppDefn) {
  return defn;
}

export const EXAMPLE_APPS = {
  'stacks-in-tab-navigation': exampleAppDefn({
    title: 'Stacks in Tab Navigation',
    component: NAVIGATION_EXAMPLES.ExampleStacksInTabNavigationApp,
  }),
};

export type ExampleApps = typeof EXAMPLE_APPS;

export function WithExampleApps({ children }: { children: React.ReactNode }) {
  const [exampleApp, setExampleApp] = useState<keyof ExampleApps | null>(null);
  return (
    <SetExampleAppContext.Provider value={setExampleApp}>
      {children}
      {(() => {
        const ExampleAppComponent = exampleApp
          ? EXAMPLE_APPS[exampleApp].component
          : null;

        if (ExampleAppComponent) {
          return (
            <View style={StyleSheet.absoluteFill}>
              <ExampleAppComponent
                exit={withLayoutAnimation(() => setExampleApp(null))}
              />
            </View>
          );
        }

        return null;
      })()}
    </SetExampleAppContext.Provider>
  );
}

export default EXAMPLE_APPS;
