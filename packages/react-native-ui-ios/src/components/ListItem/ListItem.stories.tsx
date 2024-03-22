import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  LayoutAnimation,
  SectionList,
  Switch,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import DraggableFlatList, {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import * as Haptics from 'expo-haptics';

import { Icon } from '@rnstudy/react-icons';
import {
  FlatList as AppFlatList,
  RenderItem,
} from '@rnstudy/react-native-lists';
import { calculateListPosition } from '@rnstudy/react-utils/src';
import type { Meta } from '@rnstudy/storybook-rn-types';

import { Button } from '../Button';
import Select, { SelectOption } from '../Select';
import Text from '../Text';

import ListFooter from './ListFooter';
import ListHeader from './ListHeader';
import ListItem, { getItemHeight } from './ListItem';
import ListPadding from './ListPadding';
import { getListPadding } from './utils';

const containerStyle: ViewStyle = {
  // marginTop: 16,
  alignSelf: 'stretch',
};

const meta: Meta<typeof ListItem> = {
  title: 'iOS UI/ListItem',
  component: ListItem,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    title: 'Title',
    navigationLink: true,
  },
  parameters: {
    containerStyle,
    containerBackground: 'grouped',
  },
};

export default meta;

export const Default: Meta<typeof ListItem> = {
  args: {},
};

export const Pressable: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    navigationLink: true,
    onPress: () => {
      Alert.alert('Pressed');
    },
  },
};

export const PressableButtonStyle: Meta<typeof ListItem> = {
  args: {
    title: 'Press Me',
    button: true,
    navigationLink: false,
    onPress: () => {
      Alert.alert('Pressed');
    },
  },
};

export const WithSubtitle: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    navigationLink: true,
  },
};

export const WithSubtitleCompact: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    compact: true,
    navigationLink: true,
  },
};

export const WithTrailingDetailText: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    detail: 'Detail',
    navigationLink: false,
  },
};

export const WithTrailingDetailTextAndNavigationLink: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    detail: 'Detail',
    navigationLink: true,
  },
};

export const WithIcon: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    subtitle: undefined,
    icon: <Icon name="star" color="gray" />,
    navigationLink: true,
  },
};

export const WithIconAndSubtitle: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    icon: <Icon name="star" color="gray" />,
    navigationLink: true,
  },
};

export const WithIconWithBackgroundColor: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    subtitle: undefined,
    icon: ({ backgroundColor }) => (
      <Icon name="airplane" color={backgroundColor} backgroundColor="orange" />
    ),
    navigationLink: true,
    onPress: () => {},
  },
};

export const WithIconAndSubtitleCompact: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    icon: <Icon name="star" color="gray" />,
    compact: true,
    navigationLink: true,
  },
};

export const WithSwitch: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    navigationLink: false,
    accessories: <UncontrolledSwitch />,
  },
};

export const WithSelect: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    navigationLink: false,
    accessories: <UncontrolledSelect />,
  },
};

export const WithLongTitle: Meta<typeof ListItem> = {
  args: {
    title: 'This is a long title that will expand to multiple lines',
    navigationLink: false,
  },
  parameters: {
    containerBackground: 'grouped',
    containerStyle: {
      maxWidth: 300,
      alignSelf: 'center',
    },
  },
};

export const WithLongTitleAndNavigationLink: Meta<typeof ListItem> = {
  args: {
    title: 'This is a long title that will expand to multiple lines',
    navigationLink: true,
  },
  parameters: {
    containerBackground: 'grouped',
    containerStyle: {
      maxWidth: 300,
      alignSelf: 'center',
    },
  },
};

export const WithLongTitleAndDetailNavigationLink: Meta<typeof ListItem> = {
  args: {
    title: 'This is a long title that will expand to multiple lines',
    detail: 'Detail',
    navigationLink: true,
  },
  parameters: {
    containerBackground: 'grouped',
    containerStyle: {
      maxWidth: 300,
      alignSelf: 'center',
    },
  },
};

export const WithLongDetail: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    detail: 'Detail, a long one, that will be truncated',
    navigationLink: true,
  },
  parameters: {
    containerBackground: 'grouped',
    containerStyle: {
      maxWidth: 300,
      alignSelf: 'center',
    },
  },
};

export const WithLongTitleAndLongDetail: Meta<typeof ListItem> = {
  args: {
    title: 'This is a long title that will expand to multiple lines',
    detail: 'Detail, a long one, that will be truncated',
    navigationLink: false,
  },
  parameters: {
    containerBackground: 'grouped',
    containerStyle: {
      maxWidth: 300,
      alignSelf: 'center',
    },
  },
};

export const ListPosition: Meta<typeof ListItem> = {
  args: {
    subtitle: undefined,
    navigationLink: true,
    onPress: () => {},
  },
  render: (args) => (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ gap: 40 }}>
      <View>
        <ListItem {...args} title="First" listPosition="first" />
        <ListItem {...args} title="Middle" listPosition="middle" />
        <ListItem {...args} title="Last" listPosition="last" />
      </View>
      <View>
        <ListItem {...args} title="Only" listPosition="only" />
      </View>
    </View>
  ),
};

export const InFlatList: Meta<typeof ListItem> = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ itemCount: { control: 'number' } } as any),
  },
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ itemCount: 4 } as any),
    subtitle: undefined,
    navigationLink: true,
    onPress: () => {},
  },
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = Array.from({ length: (args as any).itemCount }, (_, i) => ({
      key: i,
    }));
    return (
      <FlatList
        contentContainerStyle={{
          paddingTop: getListPadding({
            listStyle: args.listStyle,
            position: 'top',
            withHeader: false,
            first: true,
          }),
          paddingBottom: getListPadding({
            listStyle: args.listStyle,
            position: 'bottom',
            withFooter: false,
          }),
        }}
        data={data}
        renderItem={({ item, index }) => (
          <ListItem
            {...args}
            listPosition={calculateListPosition(index, data.length)}
            title={item.key}
          />
        )}
      />
    );
  },
};

export const InAppDraggableFlatList: Meta<typeof ListItem> = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ itemCount: { control: 'number' } } as any),
  },
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ itemCount: 30 } as any),
    subtitle: undefined,
    navigationLink: true,
    onPress: () => {},
  },
  render: (args) => {
    return <DemoAppFlatListComponent {...args} />;
  },
};

function DemoAppFlatListComponent(
  args: Partial<React.ComponentProps<typeof ListItem>>,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemCount: number = (args as any).itemCount;

  const [data, setData] = useState<{ key: number }[]>([]);

  useEffect(() => {
    setData(Array.from({ length: itemCount }, (_, i) => ({ key: i })));
  }, [itemCount]);

  const [editing, setEditing] = useState(false);

  // useEffect(() => {
  //   LayoutAnimation.configureNext({
  //     ...LayoutAnimation.Presets.easeInEaseOut,
  //     duration: 100,
  //   });
  // }, [editing]);

  const renderItem = useCallback<RenderItem<(typeof data)[number]>>(
    ({ item, getIndex, drag, isActive, listPosition }) => (
      <ListItem
        {...args}
        showGrabber={editing}
        dragActive={isActive}
        onPress={() => setEditing((v) => !v)}
        listPosition={listPosition}
        title={`${item.key} (index ${getIndex()})`}
        fixedHeight
        onGrabberActive={drag}
      />
    ),
    [args, editing],
  );

  const windowDimensions = useWindowDimensions();
  const uiScale = Math.max(windowDimensions.fontScale, 1);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => {
      const height = getItemHeight({
        subtitle: args.subtitle,
        compact: args.compact,
        uiScale,
      });

      return { length: height, offset: height * index, index };
    },
    [args.compact, args.subtitle, uiScale],
  );

  return (
    <AppFlatList
      contentContainerStyle={{
        paddingTop: getListPadding({
          listStyle: args.listStyle,
          position: 'top',
          withHeader: false,
          first: true,
        }),
        paddingBottom: getListPadding({
          listStyle: args.listStyle,
          position: 'bottom',
          withFooter: false,
        }),
      }}
      ListHeaderComponent={
        <ListHeader
          title="Items"
          titleStyle="prominent"
          accessories={
            <Button label="Edit" onPress={() => setEditing((v) => !v)} />
          }
        />
      }
      data={data}
      keyExtractor={(item, _index) => `${item.key}`}
      onDragBegin={() => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        // Haptics.selectionAsync();
      }}
      onPlaceholderIndexChange={() => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      onDragEnd={({ data: reorderedData }) => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setData(reorderedData);
      }}
      removeClippedSubviews={true}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
    />
  );
}

export const InDraggableFlatList: Meta<typeof ListItem> = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ itemCount: { control: 'number' } } as any),
  },
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ itemCount: 4 } as any),
    subtitle: undefined,
    navigationLink: true,
    onPress: () => {},
    showGrabber: true,
  },
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = Array.from({ length: (args as any).itemCount }, (_, i) => ({
      key: i,
    }));
    return (
      <DraggableFlatList
        style={{ height: '100%' }}
        animationConfig={{ restDisplacementThreshold: 100 }}
        contentContainerStyle={{
          paddingTop: getListPadding({
            listStyle: args.listStyle,
            position: 'top',
            withHeader: false,
            first: true,
          }),
          paddingBottom: getListPadding({
            listStyle: args.listStyle,
            position: 'bottom',
            withFooter: false,
          }),
        }}
        data={data}
        keyExtractor={(item, _index) => `${item.key}`}
        onDragBegin={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          // Haptics.selectionAsync();
        }}
        onPlaceholderIndexChange={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        onDragEnd={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          // Haptics.selectionAsync();
        }}
        renderItem={({ item, getIndex, drag, isActive }) => (
          <ListItem
            {...args}
            dragActive={isActive}
            listPosition={calculateListPosition(getIndex() || 0, data.length)}
            title={`${item.key} (index ${getIndex()})`}
            onGrabberActive={drag}
          />
        )}
      />
    );
  },
};

export const InDraggableSectionedFlatList: Meta<typeof ListItem> = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ itemCount: { control: 'number' } } as any),
  },
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ itemCount: 4 } as any),
    subtitle: undefined,
    navigationLink: true,
    onPress: () => {},
    showGrabber: true,
  },
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = Array.from({ length: (args as any).itemCount }, (_, i) => ({
      key: i,
    }));
    // const [dragPlaceholderIndex, setDragPlaceholderIndex] = useState(null);
    return (
      <NestableScrollContainer>
        <ListPadding
          position="top"
          listStyle={args.listStyle}
          withHeader={true}
          first
        />
        <ListHeader listStyle={args.listStyle} title="List 1" />
        <NestableDraggableFlatList
          data={data}
          keyExtractor={(item, _index) => `${item.key}`}
          onDragBegin={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            // Haptics.selectionAsync();
          }}
          onPlaceholderIndexChange={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          onDragEnd={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            // Haptics.selectionAsync();
          }}
          renderItem={({ item, getIndex, drag, isActive }) => (
            <ListItem
              {...args}
              dragActive={isActive}
              listPosition={calculateListPosition(getIndex() || 0, data.length)}
              title={`${item.key} (index ${getIndex()})`}
              onGrabberActive={drag}
            />
          )}
        />
        <ListPadding
          position="bottom"
          listStyle={args.listStyle}
          withFooter={false}
        />

        <ListPadding
          position="top"
          listStyle={args.listStyle}
          withHeader={true}
          first={false}
        />
        <ListHeader listStyle={args.listStyle} title="List 2" />
        <NestableDraggableFlatList
          style={{ overflow: 'visible' }}
          // containerStyle={{ overflow: 'visible' }}
          data={data}
          keyExtractor={(item, _index) => `${item.key}`}
          onDragBegin={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            // Haptics.selectionAsync();
          }}
          onPlaceholderIndexChange={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          onDragEnd={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            // Haptics.selectionAsync();
          }}
          renderItem={({ item, getIndex, drag, isActive }) => (
            <ListItem
              {...args}
              dragActive={isActive}
              listPosition={calculateListPosition(getIndex() || 0, data.length)}
              title={`${item.key} (index ${getIndex()})`}
              onGrabberActive={drag}
            />
          )}
        />
        <ListPadding
          position="bottom"
          listStyle={args.listStyle}
          withFooter={false}
        />
      </NestableScrollContainer>
    );
  },
};

export const InSectionList: Meta<typeof ListItem> = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    ...({
      __headerTitle: { control: 'boolean' },
      __footerText: { control: 'boolean' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any),
  },
  args: {
    ...({
      __headerTitle: true,
      __footerText: false,
      __data: [
        {
          first: true,
          title: 'Main dishes',
          data: ['Pizza', 'Burger', 'Risotto'],
        },
        {
          title: 'Sides',
          data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
        },
        {
          title: 'Drinks',
          data: ['Water', 'Coke', 'Beer'],
        },
        {
          title: 'Desserts',
          data: ['Cheese Cake', 'Ice Cream'],
        },
        {
          title: 'Other',
          data: ['Other'],
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any),
    subtitle: undefined,
    navigationLink: true,
    onPress: () => {},
  },
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const argsAny: any = args;
    const data = argsAny.__data;
    return (
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section, index }) => (
          <ListItem
            {...args}
            listPosition={calculateListPosition(index, section.data.length)}
            title={item}
          />
        )}
        stickySectionHeadersEnabled={args.listStyle === 'plain'}
        renderSectionHeader={({ section: { title, first } }) => (
          <>
            <ListPadding
              listStyle={args.listStyle}
              position="top"
              first={!!first}
              withHeader={argsAny.__headerTitle}
            />
            <ListHeader
              listStyle={args.listStyle}
              title={argsAny.__headerTitle ? title : undefined}
            />
          </>
        )}
        renderSectionFooter={({ section: { title } }) => (
          <>
            <ListFooter
              listStyle={args.listStyle}
              text={
                argsAny.__footerText ? (
                  title === 'Sides' ? (
                    <>
                      This is the footer text. It is a bit longer to see how it
                      looks with more content. You can have{' '}
                      <Text emphasized>other text</Text> included. Check{' '}
                      <Text
                        color="link"
                        onPress={() => {
                          Alert.alert('Pressed');
                        }}
                      >
                        here
                      </Text>{' '}
                      for more details.
                    </>
                  ) : (
                    'This is the footer text.'
                  )
                ) : undefined
              }
            />
            <ListPadding
              listStyle={args.listStyle}
              position="bottom"
              withFooter={argsAny.__footerText}
            />
          </>
        )}
      />
    );
  },
};

export const InSectionListLargeData: Meta<typeof ListItem> = {
  ...InSectionList,
  args: {
    ...InSectionList.args,
    ...({
      __data: Array.from({ length: 100 }, (_, i) => ({
        first: i === 0,
        title: `Section ${i}`,
        data: Array.from(
          { length: Math.floor(5 * ((i + 4) / 4)) },
          (__, j) => `Item ${i}-${j}`,
        ),
      })),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any),
  },
};

export const ListPositionWithIcon: Meta<typeof ListItem> = {
  ...ListPosition,
  args: {
    ...ListPosition.args,
    icon: <Icon name="star" color="gray" />,
  },
};

function UncontrolledSwitch({
  value: defaultValue,
  ...restProps
}: React.ComponentProps<typeof Switch>) {
  const [value, setValue] = React.useState(defaultValue || false);
  return (
    <Switch
      {...restProps}
      value={value}
      onValueChange={setValue}
      {...restProps}
    />
  );
}

function UncontrolledSelect({
  value: defaultValue,
  options = SAMPLE_DROPDOWN_OPTIONS,
  ...restProps
}: Partial<React.ComponentProps<typeof Select>>) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <Select
      {...restProps}
      options={options}
      value={value}
      onValueChange={setValue}
    />
  );
}

const SAMPLE_DROPDOWN_OPTIONS: Record<string, SelectOption> = {
  js: { label: 'JavaScript' },
  ts: { label: 'TypeScript', icon: 'star.outline' },
  swift: { label: 'Swift' },
  kotlin: { label: 'Kotlin' },
};

// export const Simple: Meta<typeof ListItem> = {
//   args: {
//     listStyle: 'insetGrouped',
//     children: 'Title',
//   },
// };

// export const Example1: Meta<typeof ListItem> = {
//   args: {
//     listStyle: 'insetGrouped',
//   },
//   render: (args) => (
//     <ListItem {...args}>
//       {({ textProps, textStyles }) => (
//         <>
//           <Text {...textProps}>Title Title Title Title Title</Text>
//           <Text {...textProps} style={[textProps.style, textStyles.footnote]}>
//             Details Details Details Details Details
//           </Text>
//         </>
//       )}
//     </ListItem>
//   ),
//   parameters: {
//     containerStyle: {
//       width: 393,
//     },
//     specOverlay: (
//       <Image
//         source={require('./specs/example-1.png')}
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{ width: 393, height: 44 }}
//       />
//     ),
//   },
// };

// export const Example2: Meta<typeof ListItem> = {
//   args: {
//     listStyle: 'insetGrouped',
//   },
//   parameters: {
//     containerStyle: {
//       width: 393,
//     },
//     specOverlay: (
//       <Image
//         source={require('./specs/example-2.png')}
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{ width: 393, height: 44 }}
//       />
//     ),
//   },
// };

// export const ExampleLG: Meta<typeof ListItem> = {
//   args: {
//     listStyle: 'insetGrouped',
//   },
//   parameters: {
//     containerStyle: {
//       width: 393,
//     },
//     specOverlay: (
//       <Image
//         source={require('./specs/example-lg.png')}
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{ width: 393, height: 44 }}
//       />
//     ),
//   },
// };
