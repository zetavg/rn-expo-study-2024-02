import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BackgroundColor, Text } from '../../components';

export function BackgroundColors() {
  return (
    <View>
      <BackgroundColor root>
        {(backgroundColor) => (
          <View style={[styles.exampleContainer, { backgroundColor }]}>
            <Text textStyle="headline">System</Text>

            <ExampleGroupComponent>
              <Text textStyle="caption1">Level 1</Text>

              <ExampleGroupComponent>
                <Text textStyle="caption1">Level 2</Text>

                <ExampleGroupComponent>
                  <Text textStyle="caption1">Level 3</Text>

                  <Text textStyle="callout" color="tertiary">
                    Normally, you should not nest groups above 2 levels deep.
                  </Text>
                </ExampleGroupComponent>
              </ExampleGroupComponent>
            </ExampleGroupComponent>
          </View>
        )}
      </BackgroundColor>

      <BackgroundColor grouped root>
        {(backgroundColor) => (
          <View style={[styles.exampleContainer, { backgroundColor }]}>
            <Text textStyle="headline">Grouped</Text>

            <ExampleGroupComponent>
              <Text textStyle="caption1">Level 1</Text>

              <ExampleGroupComponent>
                <Text textStyle="caption1">Level 2</Text>

                <ExampleGroupComponent>
                  <Text textStyle="caption1">Level 3</Text>

                  <Text textStyle="callout" color="tertiary">
                    Normally, you should not nest groups above 2 levels deep.
                  </Text>
                </ExampleGroupComponent>
              </ExampleGroupComponent>
            </ExampleGroupComponent>

            <Text textStyle="footnote" color="secondary">
              With the default iOS color theme for dark mode, this will be the
              same as default.
            </Text>
          </View>
        )}
      </BackgroundColor>
    </View>
  );
}

/**
 * An example group component using `BackgroundColor`.
 */
function ExampleGroupComponent({ children }: { children?: React.ReactNode }) {
  return (
    <BackgroundColor>
      {(backgroundColor) => (
        <View style={[styles.exampleGroup, { backgroundColor }]}>
          {children}
        </View>
      )}
    </BackgroundColor>
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
