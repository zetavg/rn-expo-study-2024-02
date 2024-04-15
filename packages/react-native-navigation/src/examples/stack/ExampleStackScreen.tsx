import React, { useState } from 'react';

import {
  Form,
  FormGroup,
  List,
  Menu,
  SegmentedControl,
  withLayoutAnimation,
} from '@rnstudy/react-native-ui';
import { objectMap } from '@rnstudy/react-utils';

import {
  StackScreenContent,
  StackScreenContentProps,
} from '../../screen-contents';
import { StackScreenProps } from '../../types';
import { View, StyleSheet } from 'react-native';

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

  const exampleSegmentedControlOptions = {
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  };
  const [exampleSegmentedControlValue, setExampleSegmentedControlValue] =
    useState<keyof typeof exampleSegmentedControlOptions>('all');

  const headerTitleContentExamples = {
    SegmentedControl: {
      name: 'SegmentedControl',
      content: (
        <SegmentedControl
          options={exampleSegmentedControlOptions}
          value={exampleSegmentedControlValue}
          onValueChange={setExampleSegmentedControlValue}
        />
      ),
    },
  } as const;

  const [headerTitleContentExample, setHeaderTitleContentExample] = useState<
    keyof typeof headerTitleContentExamples | 'undefined'
  >('undefined');

  const headerTrailingContentExamples = {
    EditTextButton: {
      name: 'Edit Text Button',
      content: <StackScreenContent.HeaderControlButton label="Edit" />,
    },
    ShareButton: {
      name: 'Share Button',
      content: (
        <StackScreenContent.HeaderControlButton label="Share" icon="_share" />
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
  } as const;

  const [headerTrailingContentExample, setHeaderTrailingContentExample] =
    useState<{ [key in keyof typeof headerTrailingContentExamples]?: boolean }>(
      {},
    );

  const [tmpSearchBarCancelButtonText, setTmpSearchBarCancelButtonText] =
    useState<string | null>(null);

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
      headerTrailingContent={
        <>
          {/* <StackScreenContent.HeaderControlButton label="編輯" /> */}
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
      }
    >
      <StackScreenContent.ScrollView>
        <View style={{width: 120, height: 100, top: 0, backgroundColor: '#333', position: 'absolute' }}></View>
        <View style={{width: 120, height: 100, top: 50, right: 0, backgroundColor: '#333', position: 'absolute' }}></View>
        <View style={{ height: 200 }}></View>
        <FormGroup first>
          <Form.TextInput
            label="Title"
            placeholder="Enter Title"
            value={stackScreenContentProps.title || ''}
            onValueChange={(title) =>
              setStackScreenContentProps((s) => ({ ...s, title }))
            }
            clearButtonMode="while-editing"
          />
          <Form.RadioButtons
            label="Grouped"
            options={{
              undefined: { label: 'Default' },
              true: { label: 'true' },
              false: { label: 'false' },
            }}
            value={
              typeof stackScreenContentProps.grouped === 'boolean'
                ? JSON.stringify(stackScreenContentProps.grouped)
                : 'undefined'
            }
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
                stackScreenContentProps,
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
            onValueChange={(showHeader) => {
              // This cannot be changed dynamically, so we need to navigate to a new screen with the value updated.
              navigation.push(route.name, {
                stackScreenContentProps: {
                  ...stackScreenContentProps,
                  showHeader,
                },
              });
            }}
          />
          <Form.Switch
            label="Header Background Transparent"
            value={stackScreenContentProps.headerBackgroundTransparent}
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
            onValueChange={(headerTitleVisible) =>
              setStackScreenContentProps((s) => ({ ...s, headerTitleVisible }))
            }
          />
          <Form.Switch
            label="Header Large Title"
            value={stackScreenContentProps.headerLargeTitle}
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
            onValueChange={(headerBackTitle) => {
              if (headerBackTitle) {
                setStackScreenContentProps((s) => ({ ...s, headerBackTitle }));
              } else {
                // This cannot be reset dynamically, so we need to navigate to a new screen with the value reset.
                navigation.push(route.name, {
                  stackScreenContentProps: {
                    ...stackScreenContentProps,
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
                    ...stackScreenContentProps,
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
            options={{
              undefined: { label: 'undefined' },
              ...objectMap(headerTitleContentExamples, (example) => ({
                label: example.name,
              })),
            }}
            value={headerTitleContentExample}
            onValueChange={withLayoutAnimation(setHeaderTitleContentExample)}
          />
          {headerTitleContentExample === 'SegmentedControl' && (
            <Form.Select
              label="SegmentedControl Value"
              options={objectMap(exampleSegmentedControlOptions, (label) => ({
                label,
              }))}
              value={exampleSegmentedControlValue}
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
            onValueChange={(enable) => {
              // The header search bar cannot be enabled or disabled dynamically, so we need to navigate to a new screen with the header search bar enabled or disabled.
              navigation.push(route.name, {
                stackScreenContentProps: {
                  ...stackScreenContentProps,
                  headerSearchBarOptions: {
                    ...stackScreenContentProps.headerSearchBarOptions,
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
              onValueChange={setTmpSearchBarCancelButtonText}
              onBlur={() => {
                // This cannot be changed dynamically, so we need to navigate to a new screen with the value updated.
                tmpSearchBarCancelButtonText &&
                  navigation.push(route.name, {
                    stackScreenContentProps: {
                      ...stackScreenContentProps,
                      headerSearchBarOptions: {
                        ...stackScreenContentProps.headerSearchBarOptions,
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
              onValueChange={(hideWhenScrolling) => {
                // This cannot be changed dynamically, so we need to navigate to a new screen with the value updated.
                navigation.push(route.name, {
                  stackScreenContentProps: {
                    ...stackScreenContentProps,
                    headerSearchBarOptions: {
                      ...stackScreenContentProps.headerSearchBarOptions,
                      hideWhenScrolling,
                    },
                  },
                });
              }}
            />
          )}
          {/* {stackScreenContentProps.headerSearchBarOptions?.enable && (
            <Form.Switch
              label="Auto Focus"
              value={stackScreenContentProps.headerSearchBarOptions?.autoFocus}
              onValueChange={(autoFocus) => {
                // This can be changed dynamically, so we need to navigate to a new screen with the value updated.
                navigation.push(route.name, {
                  stackScreenContentProps: {
                    ...stackScreenContentProps,
                    headerSearchBarOptions: {
                      ...stackScreenContentProps.headerSearchBarOptions,
                      autoFocus,
                    },
                  },
                });
              }}
            />
          )} */}
        </FormGroup>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
