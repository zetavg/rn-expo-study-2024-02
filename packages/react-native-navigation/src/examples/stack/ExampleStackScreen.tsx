import React, { useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';

import {
  Form,
  FormGroup,
  List,
  Menu,
  RNTextInput,
  SegmentedControl,
  Text,
  withLayoutAnimation,
} from '@rnstudy/react-native-ui';
import { objectMap } from '@rnstudy/react-utils';

import {
  StackScreenContent,
  StackScreenContentProps,
} from '../../screen-contents';
import { StackScreenProps } from '../../types';

const EXAMPLE_ON_PRESS_HANDLER = () => {
  Alert.alert('Pressed');
};

const EXAMPLE_MENU_ITEMS: React.ComponentProps<typeof Menu>['items'] = [
  { title: 'Copy', icon: '_copy', handler: EXAMPLE_ON_PRESS_HANDLER },
  { title: 'Duplicate', icon: '_duplicate', handler: EXAMPLE_ON_PRESS_HANDLER },
  {
    inline: true,
    items: [
      { title: 'Select', icon: '_select', handler: EXAMPLE_ON_PRESS_HANDLER },
    ],
  },
  {
    title: 'Sort By',
    icon: '_sort_by',
    subtitle: 'Date Added',
    items: [
      {
        title: 'Name',
        checked: false,
        handler: EXAMPLE_ON_PRESS_HANDLER,
      },
      {
        title: 'Date Added',
        checked: true,
        handler: EXAMPLE_ON_PRESS_HANDLER,
      },
      {
        title: 'Date Modified',
        checked: false,
        handler: EXAMPLE_ON_PRESS_HANDLER,
      },
    ],
  },
];

const EXAMPLE_SEGMENTED_CONTROL_OPTIONS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

export default function ExampleStackScreen({
  route,
  navigation,
}: StackScreenProps<
  | {
      stackScreenContentProps?: Omit<StackScreenContentProps, 'children'>;
      headerTitleContentExample?: string;
      headerTrailingContentExample?: object;
    }
  | undefined
>) {
  const [searchBarText, setSearchBarText] = React.useState('');

  const [stackScreenContentProps, setStackScreenContentProps] = useState<
    Omit<StackScreenContentProps, 'children'>
  >({
    title: 'Title of Screen',
    grouped: true,
    showHeader: true,
    headerBackgroundTransparent: false,
    headerTitleVisible: true,
    headerLargeTitle: true,
    headerBackTitle: undefined,
    headerBackTitleVisible: true,
    ...route.params?.stackScreenContentProps,
    headerSearchBarOptions: {
      enable: false,
      placeholder: undefined,
      cancelButtonText: undefined,
      hideWhenScrolling: true,
      autoFocus: false,
      ...route.params?.stackScreenContentProps?.headerSearchBarOptions,
    },
  });
  const stackScreenContentPropsRef = useRef(stackScreenContentProps);
  stackScreenContentPropsRef.current = stackScreenContentProps;

  const [exampleSegmentedControlValue, setExampleSegmentedControlValue] =
    useState<keyof typeof EXAMPLE_SEGMENTED_CONTROL_OPTIONS>('all');

  const headerTitleContentExamples = useMemo(
    () =>
      ({
        SegmentedControl: {
          name: 'SegmentedControl',
          content: (
            <SegmentedControl
              options={EXAMPLE_SEGMENTED_CONTROL_OPTIONS}
              value={exampleSegmentedControlValue}
              onValueChange={setExampleSegmentedControlValue}
            />
          ),
        },
        CustomText: {
          name: 'Custom Text',
          content: (
            <>
              <Text numberOfLines={1} callout>
                Custom Title Text
              </Text>
              <Text numberOfLines={1} caption1 secondary>
                Custom Subtitle Text
              </Text>
            </>
          ),
        },
      }) as const,
    [exampleSegmentedControlValue],
  );

  const [headerTitleContentExample, setHeaderTitleContentExample] = useState<
    keyof typeof headerTitleContentExamples | 'undefined'
  >(
    (route.params?.headerTitleContentExample || '') in
      headerTitleContentExamples
      ? (route.params
          ?.headerTitleContentExample as keyof typeof headerTitleContentExamples)
      : 'undefined',
  );
  const headerTitleContentExampleRef = useRef(headerTitleContentExample);
  headerTitleContentExampleRef.current = headerTitleContentExample;

  const headerTrailingContentExamples = useMemo(
    () =>
      ({
        EditTextButton: {
          name: 'Edit Text Button',
          content: (
            <StackScreenContent.HeaderControlButton
              label="Edit"
              onPress={EXAMPLE_ON_PRESS_HANDLER}
            />
          ),
        },
        ShareButton: {
          name: 'Share Button',
          content: (
            <StackScreenContent.HeaderControlButton
              label="Share"
              icon="_share"
              onPress={EXAMPLE_ON_PRESS_HANDLER}
            />
          ),
        },
        EditIconButton: {
          name: 'Edit Icon Button',
          content: (
            <StackScreenContent.HeaderControlButton
              label="Edit"
              icon="_edit.square"
              onPress={EXAMPLE_ON_PRESS_HANDLER}
            />
          ),
        },
        MenuButton: {
          name: 'Menu Button',
          content: (
            <Menu items={EXAMPLE_MENU_ITEMS}>
              {(openMenu) => (
                <StackScreenContent.HeaderControlButton
                  label="More"
                  icon="_header_menu"
                  onPress={openMenu}
                />
              )}
            </Menu>
          ),
        },
        DoneButton: {
          name: 'Done Button',
          content: (
            <StackScreenContent.HeaderControlButton
              mandatory
              label="Done"
              onPress={EXAMPLE_ON_PRESS_HANDLER}
            />
          ),
        },
      }) as const,
    [],
  );

  const [headerTrailingContentExample, setHeaderTrailingContentExample] =
    useState<{ [key in keyof typeof headerTrailingContentExamples]?: boolean }>(
      route.params?.headerTrailingContentExample || {},
    );
  const headerTrailingContentExampleRef = useRef(headerTrailingContentExample);
  headerTrailingContentExampleRef.current = headerTrailingContentExample;

  const [tmpSearchBarCancelButtonText, setTmpSearchBarCancelButtonText] =
    useState<string | null>(null);

  const [counter, setCounter] = useState(0);

  const titleTextInputRef = useRef<RNTextInput>(null);

  return (
    <StackScreenContent
      {...stackScreenContentProps}
      headerSearchBarOptions={{
        ...stackScreenContentProps.headerSearchBarOptions,
        onChangeText: setSearchBarText,
      }}
      headerTitleContent={
        headerTitleContentExample === 'undefined'
          ? undefined
          : headerTitleContentExamples[headerTitleContentExample].content
      }
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTrailingContent={useMemo(() => {
        return (
          <>
            {Object.keys(headerTrailingContentExamples)
              .filter(
                (key) =>
                  headerTrailingContentExample[
                    key as keyof typeof headerTrailingContentExamples
                  ],
              )
              .map((key) => (
                <React.Fragment key={key}>
                  {
                    headerTrailingContentExamples[
                      key as keyof typeof headerTrailingContentExamples
                    ].content
                  }
                </React.Fragment>
              ))}
          </>
        );
      }, [headerTrailingContentExample, headerTrailingContentExamples])}
    >
      <StackScreenContent.ScrollView>
        <FormGroup first>
          <Form.TextInput
            ref={titleTextInputRef}
            label="Title"
            placeholder="Enter Title"
            value={stackScreenContentProps.title || ''}
            onValueChangeIsStable
            onValueChange={(title) =>
              setStackScreenContentProps((s) => ({ ...s, title }))
            }
            clearButtonMode="while-editing"
          />
          <Form.RadioButtons
            label="Grouped"
            options={useMemo(
              () => ({
                undefined: { label: 'Default' },
                true: { label: 'true' },
                false: { label: 'false' },
              }),
              [],
            )}
            value={
              typeof stackScreenContentProps.grouped === 'boolean'
                ? JSON.stringify(stackScreenContentProps.grouped)
                : 'undefined'
            }
            onValueChangeIsStable
            onValueChange={(value) => {
              setStackScreenContentProps((s) => ({
                ...s,
                grouped: value === 'undefined' ? undefined : JSON.parse(value),
              }));
            }}
          />
        </FormGroup>

        <List listStyle="insetGrouped">
          <List.Item.Memoized
            button
            title="Go to Another Screen"
            onPressIsStable
            onPress={() =>
              navigation.push(route.name, {
                stackScreenContentProps: stackScreenContentPropsRef.current,
                headerTitleContentExample: headerTitleContentExampleRef.current,
                headerTrailingContentExample:
                  headerTrailingContentExampleRef.current,
              })
            }
          />
          <List.Item.Memoized
            button
            title="Go Back"
            onPressIsStable
            onPress={() => navigation.goBack()}
          />
        </List>

        <FormGroup>
          <Form.Switch
            label="Show Header"
            value={stackScreenContentProps.showHeader}
            onValueChangeIsStable
            onValueChange={(showHeader) => {
              // This cannot be changed dynamically, so we need to navigate to a new screen with the value updated.
              navigation.push(route.name, {
                stackScreenContentProps: {
                  ...stackScreenContentPropsRef.current,
                  showHeader,
                },
                headerTitleContentExample: headerTitleContentExampleRef.current,
                headerTrailingContentExample:
                  headerTrailingContentExampleRef.current,
              });
            }}
          />
          <Form.Switch
            label="Header Background Transparent"
            value={stackScreenContentProps.headerBackgroundTransparent}
            onValueChangeIsStable
            onValueChange={(headerBackgroundTransparent) =>
              setStackScreenContentProps((s) => ({
                ...s,
                headerBackgroundTransparent,
              }))
            }
          />
          <Form.Switch
            label="Header Title Visible"
            value={stackScreenContentProps.headerTitleVisible}
            onValueChangeIsStable
            onValueChange={(headerTitleVisible) =>
              setStackScreenContentProps((s) => ({ ...s, headerTitleVisible }))
            }
          />
          <Form.Switch
            label="Header Large Title"
            value={stackScreenContentProps.headerLargeTitle}
            onValueChangeIsStable
            onValueChange={(headerLargeTitle) =>
              setStackScreenContentProps((s) => ({ ...s, headerLargeTitle }))
            }
          />
        </FormGroup>

        <FormGroup footer={<FormGroup.Footer text="Only works on iOS." />}>
          <Form.TextInput
            label="Header Back Title"
            placeholder="Back"
            value={stackScreenContentProps.headerBackTitle || ''}
            onValueChangeIsStable
            onValueChange={(headerBackTitle) => {
              if (headerBackTitle) {
                setStackScreenContentProps((s) => ({ ...s, headerBackTitle }));
              } else {
                // This cannot be reset dynamically, so we need to navigate to a new screen with the value reset.
                navigation.push(route.name, {
                  stackScreenContentProps: {
                    ...stackScreenContentPropsRef.current,
                    headerBackTitle: undefined,
                  },
                  headerTitleContentExample:
                    headerTitleContentExampleRef.current,
                  headerTrailingContentExample:
                    headerTrailingContentExampleRef.current,
                });
              }
            }}
            clearButtonMode="while-editing"
          />
          <Form.Switch
            label="Header Back Title Visible"
            value={stackScreenContentProps.headerBackTitleVisible}
            onValueChangeIsStable
            onValueChange={(headerBackTitleVisible) => {
              if (!headerBackTitleVisible) {
                setStackScreenContentProps((s) => ({
                  ...s,
                  headerBackTitleVisible,
                }));
              } else {
                // This cannot be reset dynamically, so we need to navigate to a new screen with the value reset.
                navigation.push(route.name, {
                  stackScreenContentProps: {
                    ...stackScreenContentPropsRef.current,
                    headerBackTitleVisible: true,
                  },
                  headerTitleContentExample:
                    headerTitleContentExampleRef.current,
                  headerTrailingContentExample:
                    headerTrailingContentExampleRef.current,
                });
              }
            }}
          />
        </FormGroup>

        <FormGroup>
          <Form.Select
            label="Header Title Content"
            options={useMemo(
              () => ({
                undefined: { label: 'undefined' },
                ...objectMap(headerTitleContentExamples, (example) => ({
                  label: example.name,
                })),
              }),
              [headerTitleContentExamples],
            )}
            value={headerTitleContentExample}
            onValueChangeIsStable
            onValueChange={withLayoutAnimation(setHeaderTitleContentExample)}
          />
          {headerTitleContentExample === 'SegmentedControl' && (
            <Form.Select
              label="SegmentedControl Value"
              options={objectMap(
                EXAMPLE_SEGMENTED_CONTROL_OPTIONS,
                (label) => ({
                  label,
                }),
              )}
              value={exampleSegmentedControlValue}
              onValueChangeIsStable
              onValueChange={setExampleSegmentedControlValue}
            />
          )}
        </FormGroup>

        <FormGroup
          header={<FormGroup.Header title="Header Trailing Contents" />}
        >
          {Object.keys(headerTrailingContentExamples).map((key_) => {
            const key = key_ as keyof typeof headerTrailingContentExamples;
            return (
              <Form.Switch
                key={key}
                label={headerTrailingContentExamples[key].name}
                value={headerTrailingContentExample[key]}
                onValueChangeIsStable
                onValueChange={(enabled) => {
                  setHeaderTrailingContentExample((s) => ({
                    ...s,
                    [key]: enabled,
                  }));
                }}
              />
            );
          })}
        </FormGroup>

        <FormGroup
          header={<FormGroup.Header title="Header Search Bar" />}
          footer={
            searchBarText ? (
              <FormGroup.Footer text={`Search bar text: "${searchBarText}".`} />
            ) : undefined
          }
        >
          <Form.Switch
            label="Enable"
            value={stackScreenContentProps.headerSearchBarOptions?.enable}
            onValueChangeIsStable
            onValueChange={(enable) => {
              // The header search bar cannot be enabled or disabled dynamically, so we need to navigate to a new screen with the header search bar enabled or disabled.
              navigation.push(route.name, {
                stackScreenContentProps: {
                  ...stackScreenContentPropsRef.current,
                  headerSearchBarOptions: {
                    ...stackScreenContentPropsRef.current
                      .headerSearchBarOptions,
                    enable,
                  },
                },
                headerTitleContentExample: headerTitleContentExampleRef.current,
                headerTrailingContentExample:
                  headerTrailingContentExampleRef.current,
              });
            }}
          />
          {stackScreenContentProps.headerSearchBarOptions?.enable && (
            <Form.TextInput
              label="Placeholder"
              placeholder="Search"
              value={
                stackScreenContentProps.headerSearchBarOptions?.placeholder ||
                ''
              }
              onValueChangeIsStable
              onValueChange={(value) =>
                setStackScreenContentProps((s) => ({
                  ...s,
                  headerSearchBarOptions: {
                    ...s.headerSearchBarOptions,
                    placeholder: value || undefined,
                  },
                }))
              }
            />
          )}
          {stackScreenContentProps.headerSearchBarOptions?.enable && (
            <Form.TextInput
              label="Cancel Button Text"
              placeholder="Cancel"
              value={
                tmpSearchBarCancelButtonText ??
                (stackScreenContentProps.headerSearchBarOptions
                  ?.cancelButtonText ||
                  '')
              }
              onValueChangeIsStable
              onValueChange={setTmpSearchBarCancelButtonText}
              onBlur={() => {
                // This cannot be changed dynamically, so we need to navigate to a new screen with the value updated.
                tmpSearchBarCancelButtonText &&
                  navigation.push(route.name, {
                    stackScreenContentProps: {
                      ...stackScreenContentPropsRef.current,
                      headerSearchBarOptions: {
                        ...stackScreenContentPropsRef.current
                          .headerSearchBarOptions,
                        cancelButtonText: tmpSearchBarCancelButtonText,
                      },
                    },
                    headerTitleContentExample:
                      headerTitleContentExampleRef.current,
                    headerTrailingContentExample:
                      headerTrailingContentExampleRef.current,
                  });
                setTmpSearchBarCancelButtonText(null);
              }}
            />
          )}
          {stackScreenContentProps.headerSearchBarOptions?.enable && (
            <Form.Switch
              label="Hide When Scrolling"
              value={
                stackScreenContentProps.headerSearchBarOptions
                  ?.hideWhenScrolling
              }
              onValueChangeIsStable
              onValueChange={(hideWhenScrolling) => {
                // This cannot be changed dynamically, so we need to navigate to a new screen with the value updated.
                navigation.push(route.name, {
                  stackScreenContentProps: {
                    ...stackScreenContentPropsRef.current,
                    headerSearchBarOptions: {
                      ...stackScreenContentPropsRef.current
                        .headerSearchBarOptions,
                      hideWhenScrolling,
                    },
                  },
                  headerTitleContentExample:
                    headerTitleContentExampleRef.current,
                  headerTrailingContentExample:
                    headerTrailingContentExampleRef.current,
                });
              }}
            />
          )}
        </FormGroup>

        <List
          listStyle="insetGrouped"
          footer={
            <List.Footer.Memoized
              textIsStable
              text={
                <>
                  This is used to test re-rendering the contents of the screen
                  with the props of <Text monospaced>StackScreenContent</Text>{' '}
                  remaining the same (except <Text monospaced>children</Text>).
                </>
              }
            />
          }
        >
          <List.Item.Memoized title="Counter" detail={`${counter}`} />
          <List.Item.Memoized
            button
            title="Increase"
            onPressIsStable
            onPress={() => setCounter((n) => n + 1)}
          />
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
