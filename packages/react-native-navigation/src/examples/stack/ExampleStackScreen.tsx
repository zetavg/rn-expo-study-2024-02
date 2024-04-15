import React, { useMemo, useRef, useState } from 'react';

import {
  Form,
  FormGroup,
  List,
  Menu,
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

const EXAMPLE_MENU_ITEMS: React.ComponentProps<typeof Menu>['items'] = [
  { title: 'Copy', icon: '_copy' },
  { title: 'Duplicate', icon: '_duplicate' },
  {
    inline: true,
    items: [{ title: 'Select', icon: '_select' }],
  },
  {
    title: 'Sort By',
    icon: '_sort_by',
    subtitle: 'Date Added',
    items: [
      { title: 'Name' },
      { title: 'Date Added', checked: true },
      { title: 'Date Modified' },
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
      }) as const,
    [exampleSegmentedControlValue],
  );

  const [headerTitleContentExample, setHeaderTitleContentExample] = useState<
    keyof typeof headerTitleContentExamples | 'undefined'
  >('undefined');

  const headerTrailingContentExamples = useMemo(
    () =>
      ({
        EditTextButton: {
          name: 'Edit Text Button',
          content: <StackScreenContent.HeaderControlButton label="Edit" />,
        },
        ShareButton: {
          name: 'Share Button',
          content: (
            <StackScreenContent.HeaderControlButton
              label="Share"
              icon="_share"
            />
          ),
        },
        EditIconButton: {
          name: 'Edit Icon Button',
          content: (
            <StackScreenContent.HeaderControlButton
              label="Edit"
              icon="_edit.square"
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
                  icon="_more"
                  onPress={openMenu}
                />
              )}
            </Menu>
          ),
        },
        DoneButton: {
          name: 'Done Button',
          content: (
            <StackScreenContent.HeaderControlButton mandatory label="Done" />
          ),
        },
      }) as const,
    [],
  );

  const [headerTrailingContentExample, setHeaderTrailingContentExample] =
    useState<{ [key in keyof typeof headerTrailingContentExamples]?: boolean }>(
      {},
    );

  const [tmpSearchBarCancelButtonText, setTmpSearchBarCancelButtonText] =
    useState<string | null>(null);

  const [counter, setCounter] = useState(0);

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
            label="Title"
            placeholder="Enter Title"
            value={stackScreenContentProps.title || ''}
            onValueChangeIsDependencyFree
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
            onValueChangeIsDependencyFree
            onValueChange={(value) => {
              setStackScreenContentProps((s) => ({
                ...s,
                grouped: value === 'undefined' ? undefined : JSON.parse(value),
              }));
            }}
          />
        </FormGroup>

        <List listStyle="insetGrouped">
          <List.Item
            button
            title="Go to Another Screen"
            onPress={() =>
              navigation.push(route.name, {
                stackScreenContentProps: stackScreenContentPropsRef.current,
              })
            }
          />
          <List.Item
            button
            title="Go Back"
            onPress={() => navigation.goBack()}
          />
        </List>

        <FormGroup>
          <Form.Switch
            label="Show Header"
            value={stackScreenContentProps.showHeader}
            onValueChangeIsDependencyFree
            onValueChange={(showHeader) => {
              // This cannot be changed dynamically, so we need to navigate to a new screen with the value updated.
              navigation.push(route.name, {
                stackScreenContentProps: {
                  ...stackScreenContentPropsRef.current,
                  showHeader,
                },
              });
            }}
          />
          <Form.Switch
            label="Header Background Transparent"
            value={stackScreenContentProps.headerBackgroundTransparent}
            onValueChangeIsDependencyFree
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
            onValueChangeIsDependencyFree
            onValueChange={(headerTitleVisible) =>
              setStackScreenContentProps((s) => ({ ...s, headerTitleVisible }))
            }
          />
          <Form.Switch
            label="Header Large Title"
            value={stackScreenContentProps.headerLargeTitle}
            onValueChangeIsDependencyFree
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
            onValueChangeIsDependencyFree
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
                });
              }
            }}
            clearButtonMode="while-editing"
          />
          <Form.Switch
            label="Header Back Title Visible"
            value={stackScreenContentProps.headerBackTitleVisible}
            onValueChangeIsDependencyFree
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
            onValueChangeIsDependencyFree
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
              onValueChangeIsDependencyFree
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
                onValueChangeIsDependencyFree
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
            onValueChangeIsDependencyFree
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
              onValueChangeIsDependencyFree
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
              onValueChangeIsDependencyFree
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
              onValueChangeIsDependencyFree
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
                });
              }}
            />
          )}
        </FormGroup>

        <List
          listStyle="insetGrouped"
          footer={
            <List.Footer
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
          <List.Item title="Counter" detail={`${counter}`} />
          <List.Item
            button
            title="Increase"
            onPress={() => setCounter((n) => n + 1)}
          />
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
