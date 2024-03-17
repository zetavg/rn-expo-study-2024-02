import React, { useContext } from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import type {
  ContextMenuButtonProps,
  ContextMenuViewProps,
} from 'react-native-ios-context-menu';
import { Entries } from 'type-fest';

import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '@rnstudy/react-utils';

import { Button } from '../Button';
import { Text, TextPropsContext } from '../Text';

const ContextMenuView: (props: ContextMenuViewProps) => JSX.Element = (() => {
  // Use dynamic import to avoid loading the module on unsupported platforms.
  if (Platform.OS === 'ios') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('react-native-ios-context-menu').ContextMenuView;
  } else {
    return () => (
      <Text style={styles.unsupportedPlatformErrorText}>
        ContextMenuView is not supported on this platform.
      </Text>
    );
  }
})();

const ContextMenuButton: (props: ContextMenuButtonProps) => JSX.Element =
  (() => {
    // Use dynamic import to avoid loading the module on unsupported platforms.
    if (Platform.OS === 'ios') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('react-native-ios-context-menu').ContextMenuButton;
    } else {
      return () => (
        <Text style={styles.unsupportedPlatformErrorText}>
          ContextMenuButton is not supported on this platform.
        </Text>
      );
    }
  })();

type Props = object;

export function Test({}: Props) {
  return (
    <>
      <TextPropsContext.Provider value={{ textStyle: 'title1', color: 'link' }}>
        <Text>Context Text</Text>
        <Test28 />
      </TextPropsContext.Provider>
      <MakeTextLargeLink>
        <Text>Context Text</Text>
        <Text color="default">Context Text force default color</Text>
        <MakeTextLargeLink.TitleText>TitleText</MakeTextLargeLink.TitleText>
      </MakeTextLargeLink>

      <MakeTextLargeLink>
        <Text>MakeTextLargeLink</Text>
        <MakeTextBold>
          <Text>MakeTextLargeLink and Bold</Text>
        </MakeTextBold>
      </MakeTextLargeLink>

      <MakeTextLargeLink>
        {({ textProps }) => (
          <>
            <Text {...textProps}>Context Text</Text>
            <Text {...textProps}>Context Text</Text>
          </>
        )}
      </MakeTextLargeLink>
      <ContextMenuView
        style={styles.container}
        menuConfig={{
          menuTitle: 'BasicUsageExample01',
          menuItems: [
            {
              actionKey: 'key-01',
              actionTitle: 'Action #1',
              icon: {
                type: 'IMAGE_SYSTEM',
                imageValue: {
                  systemName: 'folder',
                },
              },
            },
            {
              actionKey: 'key-02',
              actionTitle: 'Action #2',
            },
            {
              actionKey: 'key-03',
              actionTitle: 'Action #3',
            },
          ],
        }}
        onPressMenuItem={({ nativeEvent }) => {
          Alert.alert(
            'onPressMenuItem Event',
            `actionKey: ${nativeEvent.actionKey} - actionTitle: ${nativeEvent.actionTitle}`,
          );
        }}
        onMenuWillShow={() => {
          Alert.alert('onMenuWillShow Event');
        }}
      >
        <Text style={styles.text}>Press And Hold To Show Context Menu</Text>
      </ContextMenuView>

      <ContextMenuButton
        menuConfig={{
          menuTitle: 'ContextMenuButtonSimpleExample01',
          menuItems: [
            {
              actionKey: 'key-01',
              actionTitle: 'Action #1',
            },
            {
              actionKey: 'key-02',
              actionTitle: 'Action #2',
              icon: {
                type: 'IMAGE_SYSTEM',
                imageValue: {
                  systemName: 'folder',
                },
              },
            },
            {
              actionKey: 'key-03',
              actionTitle: 'Action #3',
              actionSubtitle: 'Action #3 Subtitle',
            },
            {
              actionKey: 'key-checked',
              actionTitle: 'Checked',
              menuState: 'on',
            },
            {
              actionKey: 'key-destructive',
              actionTitle: 'Destructive',
              menuAttributes: ['destructive'],
            },
            {
              menuTitle: 'Nested Menu #1',
              menuItems: [
                {
                  actionKey: 'nested-key-01-01',
                  actionTitle: 'Nested Action #1',
                },
                {
                  actionKey: 'nested-key-01-02',
                  actionTitle: 'Nested Action #2',
                  actionSubtitle: 'Nested Action #2 Subtitle',
                },
              ],
            },
            {
              menuTitle: 'Nested Menu #2',
              menuSubtitle: 'Nested Menu Subtitle',
              menuItems: [
                {
                  actionKey: 'nested-key-02-01',
                  actionTitle: 'Nested Action #1',
                },
                {
                  actionKey: 'nested-key-02-02',
                  actionTitle: 'Nested Action #2',
                  actionSubtitle: 'Nested Action #2 Subtitle',
                },
              ],
            },

            {
              menuTitle: 'Inline Nested Menu',
              menuSubtitle: 'Nested Menu Subtitle',
              menuOptions: ['displayInline'],
              menuItems: [
                {
                  actionKey: 'nested-key-02-01',
                  actionTitle: 'Nested Action #1',
                },
                {
                  actionKey: 'nested-key-02-02',
                  actionTitle: 'Nested Action #2',
                  actionSubtitle: 'Nested Action #2 Subtitle',
                },
              ],
            },
          ],
        }}
        onPressMenuItem={(event) => {
          const { nativeEvent } = event;
          Alert.alert(
            'onPressMenuItem Event',
            `actionKey: ${nativeEvent.actionKey}\n${JSON.stringify(event.nativeEvent, null, 2)}`,
          );
        }}
        onMenuWillShow={() => {
          Alert.alert('onMenuWillShow Event');
        }}
        isMenuPrimaryAction
      >
        <Button label="Press To Show Context Menu" buttonStyle="gray" />
      </ContextMenuButton>
    </>
  );
}

function Test28() {
  return <Text>Test28 Text</Text>;
}

function MakeTextLargeLink({
  children,
}: {
  children: ReactNodePropWithPropDefaultValuesContext<{
    textProps: Partial<React.ComponentProps<typeof Text>>;
  }>;
}) {
  const textProps: Partial<React.ComponentProps<typeof Text>> = {
    color: 'link',
    textStyle: 'title1',
  };

  return withPropDefaultValuesContext(children, {
    textProps: { value: textProps, context: TextPropsContext },
  });
}

function withDefaultProps<P extends object, C>(
  component: C,
  defaultProps: Partial<P>,
): C {
  const WithDefaultProps = React.forwardRef((props: P, ref) => {
    const propsWithNewDefaults = { ...props };

    for (const [k, value] of Object.entries(defaultProps)) {
      const key = k as keyof typeof defaultProps;
      if (propsWithNewDefaults[key] === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        propsWithNewDefaults[key] = value as any;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = component as any;

    return <Component ref={ref} {...propsWithNewDefaults} />;
  });

  WithDefaultProps.displayName = 'WithDefaultProps';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return WithDefaultProps as any;
}

MakeTextLargeLink.TitleText = withDefaultProps(Text, {
  emphasized: true,
  color: 'default',
});

// MakeTextLargeLink.TitleText = function TitleText(
//   props: React.ComponentProps<typeof Text>,
// ) {
//   const newProps = {
//     ...props,
//     emphasized: props.emphasized !== undefined ? props.emphasized : true,
//     color: props.color !== undefined ? props.color : 'default',
//   };
//   return <Text {...newProps}>MakeTextLargeLink TitleText</Text>;
// };

function MakeTextBold({
  children,
}: {
  children: ReactNodePropWithPropDefaultValuesContext<{
    textProps: Partial<React.ComponentProps<typeof Text>>;
  }>;
}) {
  const textProps: Partial<React.ComponentProps<typeof Text>> = {
    ...useContext(TextPropsContext),
    emphasized: true,
  };

  return withPropDefaultValuesContext(children, {
    textProps: { value: textProps, context: TextPropsContext },
  });
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  unsupportedPlatformErrorText: {
    fontSize: 16,
    backgroundColor: 'red',
    color: 'white',
  },
});

export default Test;
