import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, LayoutChangeEvent } from 'react-native';

import { ScrollViewRef } from '@rnstudy/react-native-lists/src';
import {
  Form,
  FormGroup,
  List,
  Menu,
  RNTextInput,
  SegmentedControl,
  Text,
  useUIPlatform,
  withLayoutAnimation,
} from '@rnstudy/react-native-ui';
import { objectMap } from '@rnstudy/react-utils';

import {
  StackScreenContent,
  StackScreenContentProps,
} from '../../screen-contents';
import { ModalContentContext } from '../../screen-contents/contexts';
import { StackScreenProps } from '../../types';

const MODAL_CLOSE_BUTTON_TYPE_OPTIONS = {
  undefined: { label: 'undefined' },
  close: { label: 'close' },
  done: { label: 'done' },
  cancel: { label: 'cancel' },
} as const;

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
      headerTitleContentExampleToShow?: string;
      headerLeadingContentExamplesToShow?: object;
      headerTrailingContentExamplesToShow?: object;
    }
  | undefined
>) {
  const scrollViewRef = useRef<ScrollViewRef>(null);

  const uiPlatform = useUIPlatform();
  const uiPlatformRef = useRef(uiPlatform);
  uiPlatformRef.current = uiPlatform;

  const [searchBarFocused, setSearchBarFocused] = React.useState(false);
  const [searchBarText, setSearchBarText] = React.useState('');

  const [stackScreenContentProps, setStackScreenContentProps] = useState<
    Omit<StackScreenContentProps, 'children'>
  >({
    title: 'Title of Screen',
    grouped: true,
    showHeader: true,
    // headerBackgroundTransparent: false,
    // headerTitleVisible: true,
    headerLargeTitle: true,
    headerBackTitle: undefined,
    headerBackTitleVisible: true,
    ...route.params?.stackScreenContentProps,
    headerSearchBarOptions: {
      enable: true,
      placeholder: undefined,
      cancelButtonText: undefined,
      primary: false,
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

  const [headerTitleContentExampleToShow, setHeaderTitleContentExampleToShow] =
    useState<keyof typeof headerTitleContentExamples | 'undefined'>(
      (route.params?.headerTitleContentExampleToShow || '') in
        headerTitleContentExamples
        ? (route.params
            ?.headerTitleContentExampleToShow as keyof typeof headerTitleContentExamples)
        : 'undefined',
    );
  const headerTitleContentExampleToShowRef = useRef(
    headerTitleContentExampleToShow,
  );
  headerTitleContentExampleToShowRef.current = headerTitleContentExampleToShow;

  const headerLeadingContentExamples = useMemo(
    () =>
      ({
        CancelTextButton: {
          name: 'Cancel Text Button',
          content: (
            <StackScreenContent.HeaderControlButton
              label="Cancel"
              onPress={EXAMPLE_ON_PRESS_HANDLER}
            />
          ),
        },
        ExitTextButton: {
          name: 'Exit Text Button',
          content: (
            <StackScreenContent.HeaderControlButton
              label="Exit"
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
      }) as const,
    [],
  );

  const [
    headerLeadingContentExamplesToShow,
    setHeaderLeadingContentExamplesToShow,
  ] = useState<{
    [key in keyof typeof headerLeadingContentExamples]?: boolean;
  }>(route.params?.headerLeadingContentExamplesToShow || {});
  const headerLeadingContentExamplesToShowRef = useRef(
    headerLeadingContentExamplesToShow,
  );
  headerLeadingContentExamplesToShowRef.current =
    headerLeadingContentExamplesToShow;

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
              primary
              label="Done"
              onPress={EXAMPLE_ON_PRESS_HANDLER}
            />
          ),
        },
      }) as const,
    [],
  );

  const [
    headerTrailingContentExamplesToShow,
    setHeaderTrailingContentExamplesToShow,
  ] = useState<{
    [key in keyof typeof headerTrailingContentExamples]?: boolean;
  }>(route.params?.headerTrailingContentExamplesToShow || {});
  const headerTrailingContentExamplesToShowRef = useRef(
    headerTrailingContentExamplesToShow,
  );
  headerTrailingContentExamplesToShowRef.current =
    headerTrailingContentExamplesToShow;

  const modalContentContextValue = useContext(ModalContentContext);
  const isFirstScreenInStack =
    route.key === navigation.getState()?.routes[0]?.key;
  const isFirstScreenInModal =
    !!modalContentContextValue && isFirstScreenInStack;

  const [tmpSearchBarCancelButtonText, setTmpSearchBarCancelButtonText] =
    useState<string | null>(null);

  const group2Y = useRef<number | null>(null);

  const handleGroup2Layout = useCallback((event: LayoutChangeEvent) => {
    group2Y.current = event.nativeEvent.layout.y;
  }, []);

  const [counter, setCounter] = useState(0);

  const titleTextInputRef = useRef<RNTextInput>(null);

  return (
    <StackScreenContent
      {...stackScreenContentProps}
      headerSearchBarOptions={{
        ...stackScreenContentProps.headerSearchBarOptions,
        onChangeText: setSearchBarText,
        onFocus: () => setSearchBarFocused(true),
        onBlur: () => setSearchBarFocused(false),
      }}
      headerTitleContent={
        headerTitleContentExampleToShow === 'undefined'
          ? undefined
          : headerTitleContentExamples[headerTitleContentExampleToShow].content
      }
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeadingContent={useMemo(() => {
        if (
          !Object.values(headerLeadingContentExamplesToShow).some(
            (show) => show,
          )
        ) {
          return undefined;
        }
        return (
          <>
            {Object.keys(headerLeadingContentExamples)
              .filter(
                (key) =>
                  headerLeadingContentExamplesToShow[
                    key as keyof typeof headerLeadingContentExamples
                  ],
              )
              .map((key) => (
                <React.Fragment key={key}>
                  {
                    headerLeadingContentExamples[
                      key as keyof typeof headerLeadingContentExamples
                    ].content
                  }
                </React.Fragment>
              ))}
          </>
        );
      }, [headerLeadingContentExamplesToShow, headerLeadingContentExamples])}
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTrailingContent={useMemo(() => {
        const elements = Object.keys(headerTrailingContentExamples)
          .filter(
            (key) =>
              headerTrailingContentExamplesToShow[
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
          ));

        if (elements.length > 0) {
          return <>{elements}</>;
        }

        return undefined;
      }, [headerTrailingContentExamplesToShow, headerTrailingContentExamples])}
    >
      <StackScreenContent.ScrollView ref={scrollViewRef}>
        <FormGroup first>
          <Form.TextInput
            ref={titleTextInputRef}
            label="Title"
            placeholder="Enter Title"
            clearButtonMode="while-editing"
            value={stackScreenContentProps.title || ''}
            onValueChangeIsStable
            onValueChange={(title) =>
              setStackScreenContentProps((s) => ({ ...s, title }))
            }
          />
          <Form.RadioButtons
            label="Grouped"
            // description={
            //   <>
            //     The set of background colors to be used. See:{' '}
            //     <Text
            //       link
            //       onPress={() =>
            //         Linking.openURL(
            //           'https://developer.apple.com/design/human-interface-guidelines/color#iOS-iPadOS',
            //         )
            //       }
            //     >
            //       here
            //     </Text>
            //     .
            //   </>
            // }
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

        <List listStyle="insetGrouped" onLayout={handleGroup2Layout}>
          <List.Item.Memoized
            button
            title="Go to Another Screen"
            onPressIsStable
            onPress={() =>
              navigation.push(route.name, {
                stackScreenContentProps: stackScreenContentPropsRef.current,
                headerTitleContentExampleToShow:
                  headerTitleContentExampleToShowRef.current,
                headerTrailingContentExamplesToShow:
                  headerTrailingContentExamplesToShowRef.current,
                headerLeadingContentExamplesToShow:
                  headerLeadingContentExamplesToShowRef.current,
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
                headerTitleContentExampleToShow:
                  headerTitleContentExampleToShowRef.current,
                headerTrailingContentExamplesToShow:
                  headerTrailingContentExamplesToShowRef.current,
                headerLeadingContentExamplesToShow:
                  headerLeadingContentExamplesToShowRef.current,
              });
            }}
          />
          {/* <Form.Switch
            label="Header Background Transparent"
            value={stackScreenContentProps.headerBackgroundTransparent}
            onValueChangeIsStable
            onValueChange={(headerBackgroundTransparent) =>
              setStackScreenContentProps((s) => ({
                ...s,
                headerBackgroundTransparent,
              }))
            }
          /> */}
          {/* <Form.Switch
            label="Header Title Visible"
            value={stackScreenContentProps.headerTitleVisible}
            onValueChangeIsStable
            onValueChange={(headerTitleVisible) =>
              setStackScreenContentProps((s) => ({ ...s, headerTitleVisible }))
            }
          /> */}
          <Form.Switch
            label="Header Large Title"
            value={stackScreenContentProps.headerLargeTitle}
            onValueChangeIsStable
            onValueChange={(headerLargeTitle) =>
              setStackScreenContentProps((s) => ({ ...s, headerLargeTitle }))
            }
          />
        </FormGroup>

        {!isFirstScreenInModal ? (
          <FormGroup
            footerText={
              'Only works on iOS. On Android, the back icon "←" will always be shown without a title.'
            }
          >
            <Form.TextInput
              label="Header Back Title"
              placeholder="Back"
              clearButtonMode="while-editing"
              value={stackScreenContentProps.headerBackTitle || ''}
              onValueChangeIsStable
              onValueChange={(headerBackTitle) => {
                if (headerBackTitle || uiPlatformRef.current !== 'ios') {
                  setStackScreenContentProps((s) => ({
                    ...s,
                    headerBackTitle,
                  }));
                } else {
                  // This cannot be reset dynamically on iOS, so we need to navigate to a new screen with the value reset.
                  navigation.push(route.name, {
                    stackScreenContentProps: {
                      ...stackScreenContentPropsRef.current,
                      headerBackTitle: undefined,
                    },
                    headerTitleContentExampleToShow:
                      headerTitleContentExampleToShowRef.current,
                    headerTrailingContentExamplesToShow:
                      headerTrailingContentExamplesToShowRef.current,
                    headerLeadingContentExamplesToShow:
                      headerLeadingContentExamplesToShowRef.current,
                  });
                }
              }}
            />
            <Form.Switch
              label="Header Back Title Visible"
              value={stackScreenContentProps.headerBackTitleVisible}
              onValueChangeIsStable
              onValueChange={(headerBackTitleVisible) => {
                if (
                  !headerBackTitleVisible ||
                  uiPlatformRef.current !== 'ios'
                ) {
                  setStackScreenContentProps((s) => ({
                    ...s,
                    headerBackTitleVisible,
                  }));
                } else {
                  // This cannot be reset dynamically on iOS, so we need to navigate to a new screen with the value reset.
                  navigation.push(route.name, {
                    stackScreenContentProps: {
                      ...stackScreenContentPropsRef.current,
                      headerBackTitleVisible: true,
                    },
                    headerTitleContentExampleToShow:
                      headerTitleContentExampleToShowRef.current,
                    headerTrailingContentExamplesToShow:
                      headerTrailingContentExamplesToShowRef.current,
                    headerLeadingContentExamplesToShow:
                      headerLeadingContentExamplesToShowRef.current,
                  });
                }
              }}
            />
          </FormGroup>
        ) : (
          <FormGroup
            footerText={
              'Only works on iOS. On Android, the "×" icon button will always be used without a label.'
            }
          >
            <Form.Select
              label="Modal Close Button Type"
              options={MODAL_CLOSE_BUTTON_TYPE_OPTIONS}
              value={
                stackScreenContentProps.modalCloseButtonType || 'undefined'
              }
              onValueChangeIsStable
              onValueChange={(modalCloseButtonType) =>
                setStackScreenContentProps((s) => ({
                  ...s,
                  modalCloseButtonType:
                    modalCloseButtonType === 'undefined'
                      ? undefined
                      : modalCloseButtonType,
                }))
              }
            />
            <Form.TextInput
              label="Modal Close Title"
              placeholder="undefined"
              clearButtonMode="while-editing"
              value={stackScreenContentProps.modalCloseTitle || ''}
              onValueChangeIsStable
              onValueChange={(modalCloseTitle) =>
                setStackScreenContentProps((s) => ({
                  ...s,
                  modalCloseTitle: modalCloseTitle || undefined,
                }))
              }
            />
          </FormGroup>
        )}

        <FormGroup footerText="Choose from a set of predefined examples. In a real app, you can use any arbitrary element.">
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
            value={headerTitleContentExampleToShow}
            onValueChangeIsStable
            onValueChange={withLayoutAnimation(
              setHeaderTitleContentExampleToShow,
            )}
          />
          {headerTitleContentExampleToShow === 'SegmentedControl' && (
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
          headerTitle="Header Trailing Contents"
          footerText="Choose from a set of predefined examples. In a real app, you can use any arbitrary element."
        >
          {Object.keys(headerTrailingContentExamples).map((key_) => {
            const key = key_ as keyof typeof headerTrailingContentExamples;
            return (
              <Form.Switch
                key={key}
                label={headerTrailingContentExamples[key].name}
                value={headerTrailingContentExamplesToShow[key]}
                onValueChangeIsStable
                onValueChange={(enabled) => {
                  setHeaderTrailingContentExamplesToShow((s) => ({
                    ...s,
                    [key]: enabled,
                  }));
                }}
              />
            );
          })}
        </FormGroup>

        <FormGroup
          headerTitle="Header Leading Contents"
          footerText="Choose from a set of predefined examples. In a real app, you can use any arbitrary element."
        >
          {Object.keys(headerLeadingContentExamples).map((key_) => {
            const key = key_ as keyof typeof headerLeadingContentExamples;
            return (
              <Form.Switch
                key={key}
                label={headerLeadingContentExamples[key].name}
                value={headerLeadingContentExamplesToShow[key]}
                onValueChangeIsStable
                onValueChange={(enabled) => {
                  setHeaderLeadingContentExamplesToShow((s) => ({
                    ...s,
                    [key]: enabled,
                  }));
                }}
              />
            );
          })}
        </FormGroup>

        <FormGroup
          headerTitle="Header Search Bar"
          footerText={[
            searchBarFocused && 'Search bar focused.',
            searchBarText && `Search bar text: "${searchBarText}".`,
          ]
            .filter((s) => !!s)
            .join(' ')}
        >
          <Form.Switch
            label="Enable"
            description={
              <>
                Defaults to <Text monospaced>false</Text>.
              </>
            }
            value={stackScreenContentProps.headerSearchBarOptions?.enable}
            onValueChangeIsStable
            onValueChange={(enable) => {
              if (uiPlatformRef.current === 'ios') {
                // The header search bar cannot be enabled or disabled dynamically on iOS, so we need to navigate to a new screen with the header search bar enabled or disabled.
                navigation.push(route.name, {
                  stackScreenContentProps: {
                    ...stackScreenContentPropsRef.current,
                    headerSearchBarOptions: {
                      ...stackScreenContentPropsRef.current
                        .headerSearchBarOptions,
                      enable,
                    },
                  },
                  headerTitleContentExampleToShow:
                    headerTitleContentExampleToShowRef.current,
                  headerTrailingContentExamplesToShow:
                    headerTrailingContentExamplesToShowRef.current,
                  headerLeadingContentExamplesToShow:
                    headerLeadingContentExamplesToShowRef.current,
                });
                return;
              }

              setStackScreenContentProps((s) => ({
                ...s,
                headerSearchBarOptions: {
                  ...s.headerSearchBarOptions,
                  enable,
                },
              }));
            }}
          />
          {stackScreenContentProps.headerSearchBarOptions?.enable && (
            <Form.TextInput
              label="Placeholder"
              placeholder="Search"
              clearButtonMode="while-editing"
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
              description={
                'Only for iOS. On Android, the "×" icon will be shown.'
              }
              placeholder="Cancel"
              clearButtonMode="while-editing"
              value={
                tmpSearchBarCancelButtonText ??
                (stackScreenContentProps.headerSearchBarOptions
                  ?.cancelButtonText ||
                  '')
              }
              onValueChangeIsStable
              onValueChange={setTmpSearchBarCancelButtonText}
              onBlur={() => {
                if (uiPlatformRef.current === 'ios') {
                  // This cannot be changed dynamically on iOS, so we need to navigate to a new screen with the value updated.
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
                      headerTitleContentExampleToShow:
                        headerTitleContentExampleToShowRef.current,
                      headerTrailingContentExamplesToShow:
                        headerTrailingContentExamplesToShowRef.current,
                      headerLeadingContentExamplesToShow:
                        headerLeadingContentExamplesToShowRef.current,
                    });
                } else {
                  setStackScreenContentProps((s) => ({
                    ...s,
                    headerSearchBarOptions: {
                      ...s.headerSearchBarOptions,
                      cancelButtonText:
                        tmpSearchBarCancelButtonText || undefined,
                    },
                  }));
                }

                setTmpSearchBarCancelButtonText(null);
              }}
            />
          )}
          {stackScreenContentProps.headerSearchBarOptions?.enable && (
            <Form.Switch
              label="Primary"
              description="Let the search bar be a primary feature of the screen."
              value={stackScreenContentProps.headerSearchBarOptions?.primary}
              onValueChangeIsStable
              onValueChange={(primary) => {
                if (uiPlatformRef.current === 'ios') {
                  // This cannot be changed dynamically on iOS, so we need to navigate to a new screen with the value updated.
                  navigation.push(route.name, {
                    stackScreenContentProps: {
                      ...stackScreenContentPropsRef.current,
                      headerSearchBarOptions: {
                        ...stackScreenContentPropsRef.current
                          .headerSearchBarOptions,
                        primary,
                      },
                    },
                    headerTitleContentExampleToShow:
                      headerTitleContentExampleToShowRef.current,
                    headerTrailingContentExamplesToShow:
                      headerTrailingContentExamplesToShowRef.current,
                    headerLeadingContentExamplesToShow:
                      headerLeadingContentExamplesToShowRef.current,
                  });
                  return;
                }

                setStackScreenContentProps((s) => ({
                  ...s,
                  headerSearchBarOptions: {
                    ...s.headerSearchBarOptions,
                    primary,
                  },
                }));
              }}
            />
          )}
          {stackScreenContentProps.headerSearchBarOptions?.enable && (
            <Form.Switch
              disabled={stackScreenContentProps.headerSearchBarOptions?.primary}
              label="Hide When Scrolling"
              description={
                stackScreenContentProps.headerSearchBarOptions?.primary ? (
                  <>
                    Will be <Text monospaced>false</Text> if{' '}
                    <Text monospaced>primary</Text> is set to{' '}
                    <Text monospaced>true</Text>.
                  </>
                ) : (
                  'Only works on iOS.'
                )
              }
              value={
                stackScreenContentProps.headerSearchBarOptions?.primary === true
                  ? false
                  : stackScreenContentProps.headerSearchBarOptions
                      ?.hideWhenScrolling
              }
              onValueChangeIsStable
              onValueChange={(hideWhenScrolling) => {
                if (uiPlatformRef.current === 'ios') {
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
                    headerTitleContentExampleToShow:
                      headerTitleContentExampleToShowRef.current,
                    headerTrailingContentExamplesToShow:
                      headerTrailingContentExamplesToShowRef.current,
                    headerLeadingContentExamplesToShow:
                      headerLeadingContentExamplesToShowRef.current,
                  });
                  return;
                }

                setStackScreenContentProps((s) => ({
                  ...s,
                  headerSearchBarOptions: {
                    ...s.headerSearchBarOptions,
                    hideWhenScrolling,
                  },
                }));
              }}
            />
          )}
        </FormGroup>

        <List listStyle="insetGrouped">
          <List.Item.Memoized
            button
            title="Scroll to Start"
            onPressIsStable
            onPress={() => scrollViewRef.current?.scrollToStart()}
          />
          <List.Item.Memoized
            button
            title="Scroll to End"
            onPressIsStable
            onPress={() => scrollViewRef.current?.scrollToEnd()}
          />
          <List.Item.Memoized
            button
            title="Scroll to Group 2"
            onPressIsStable
            onPress={() =>
              typeof group2Y.current === 'number' &&
              scrollViewRef.current?.scrollTo({ y: group2Y.current })
            }
          />
        </List>

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
