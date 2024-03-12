import React from 'react';
import { StyleSheet, View } from 'react-native';

import { WithBackgroundColor } from '../../components';
import Text from '../../components/Text';

export function BackgroundColors() {
  return (
    <View>
      <WithBackgroundColor>
        {(backgroundColor) => (
          <View style={[styles.exampleContainer, { backgroundColor }]}>
            <Text headline>Default</Text>

            <ExampleGroupComponent>
              <Text caption1>Group Level 1</Text>

              <ExampleGroupComponent>
                <Text caption1>Group Level 2</Text>

                <ExampleGroupComponent>
                  <Text caption1>Group Level 3</Text>

                  <Text callout tertiary>
                    Normally, you should not nest groups above 2 levels deep.
                  </Text>
                </ExampleGroupComponent>
              </ExampleGroupComponent>
            </ExampleGroupComponent>
          </View>
        )}
      </WithBackgroundColor>

      <WithBackgroundColor grouped>
        {(backgroundColor) => (
          <View style={[styles.exampleContainer, { backgroundColor }]}>
            <Text headline>Grouped</Text>

            <ExampleGroupComponent>
              <Text caption1>Group Level 1</Text>

              <ExampleGroupComponent>
                <Text caption1>Group Level 2</Text>

                <ExampleGroupComponent>
                  <Text caption1>Group Level 3</Text>

                  <Text callout tertiary>
                    Normally, you should not nest groups above 2 levels deep.
                  </Text>
                </ExampleGroupComponent>
              </ExampleGroupComponent>
            </ExampleGroupComponent>

            <Text footnote secondary>
              With the default iOS color theme for dark mode, this will be the
              same as default.
            </Text>
          </View>
        )}
      </WithBackgroundColor>
    </View>
  );
}

/**
 * An example group component using `WithBackgroundColor`.
 */
function ExampleGroupComponent({ children }: { children?: React.ReactNode }) {
  return (
    <WithBackgroundColor>
      {(backgroundColor) => (
        <View style={[styles.exampleGroup, { backgroundColor }]}>
          {children}
        </View>
      )}
    </WithBackgroundColor>
  );
}

const styles = StyleSheet.create({
  exampleContainer: {
    margin: 4,
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 28,
    gap: 8,
  },
  exampleGroup: {
    borderRadius: 8,
    padding: 16,
    paddingTop: 12,
    gap: 8,
  },
});

export default BackgroundColors;
