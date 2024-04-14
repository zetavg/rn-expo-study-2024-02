import React, { useState } from 'react';
import { Button, View } from 'react-native';

import { useMainStackNavigation } from '@/navigation/hooks';
import { Icon } from '@rnstudy/react-icons';
import type {
  StackScreenContentProps,
  StackScreenProps,
} from '@rnstudy/react-native-navigation';
import { StackScreenContent } from '@rnstudy/react-native-navigation';
import {
  configureNextLayoutAnimation,
  Form,
  FormGroup,
  List,
  Text,
} from '@rnstudy/react-native-ui';

export default function ExampleStackScreen({
  route,
  navigation: nav,
}: StackScreenProps<
  | {
      stackScreenContentProps?: Omit<StackScreenContentProps, 'children'>;
    }
  | undefined
>) {
  const navigation = useMainStackNavigation();

  const [stackScreenContentProps, setStackScreenContentProps] = useState<
    Omit<StackScreenContentProps, 'children'>
  >({
    title: 'Title of Screen',
    headerLargeTitle: true,
    headerSearchBarOptions: {
      enable: false,
      placeholder: undefined,
      cancelButtonText: undefined,
      hideWhenScrolling: true,
      autoFocus: false,
    },
    grouped: true,
    ...route.params?.stackScreenContentProps,
  });

  const [tmpSearchBarCancelButtonText, setTmpSearchBarCancelButtonText] =
    useState<string | null>(null);

  const [searchBarText, setSearchBarText] = React.useState('');

  return (
    <StackScreenContent {...stackScreenContentProps}>
      <StackScreenContent.ScrollView>
        <FormGroup first>
          <Form.TextInput
            label="Title"
            placeholder="Enter Title"
            value={stackScreenContentProps.title || ''}
            onValueChange={(title) =>
              setStackScreenContentProps((s) => ({ ...s, title }))
            }
          />
          <Form.Switch
            label="Header Large Title"
            value={stackScreenContentProps.headerLargeTitle}
            onValueChange={(headerLargeTitle) =>
              setStackScreenContentProps((s) => ({ ...s, headerLargeTitle }))
            }
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
          <List.Item button title="Go Back" onPress={() => nav.goBack()} />
        </List>

        <FormGroup header={<FormGroup.Header title="Header Search Bar" />}>
          <Form.Switch
            label="Enable"
            value={stackScreenContentProps.headerSearchBarOptions?.enable}
            onValueChange={(enable) => {
              // The header search bar cannot be enabled or disabled dynamically, so we need to navigate to a new screen with the header search bar enabled or disabled.
              navigation.push('ExampleStackScreen', {
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
                  navigation.push('ExampleStackScreen', {
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
                navigation.push('ExampleStackScreen', {
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
                navigation.push('ExampleStackScreen', {
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
