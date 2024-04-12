/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, LayoutAnimation, useWindowDimensions } from 'react-native';

import {
  DragEndParams,
  FlatList,
  RenderItem,
  SectionList,
} from '@rnstudy/react-native-lists';
import { argTypesFrom, collectPropsFromArgs } from '@rnstudy/react-utils';
import { Meta, StoryObj } from '@rnstudy/storybook-rn-types';

import { useUIPlatform } from '../../contexts';
import { configureNextLayoutAnimation } from '../../utils';
import { Button } from '../Button';
import Switch from '../Switch';
import { Text } from '../Text';

import ListFooterMeta from './ListFooter/ListFooter.stories';
import { ACCESSORIES_EXAMPLES as LIST_HEADER_ACCESSORIES_EXAMPLES } from './ListHeader/examples';
import ListHeaderMeta from './ListHeader/ListHeader.stories';
import ListItemMeta from './ListItem/ListItem.stories';
import {
  getListItemHeight,
  getListPadding,
  List,
  ListFooter,
  ListFooterProps,
  ListHeader,
  ListHeaderProps,
  ListItem,
  ListItemProps,
  ListItemPropsContextProvider,
  ListPadding,
  ListProps,
} from './.';
import ListPlaceholder from './ListPlaceholder';

const meta: Meta<typeof List> = {
  title: 'UI/Components/List',
  component: List,
  parameters: {
    containerStyle: {
      alignSelf: 'stretch',
    },
    containerBackground: 'grouped',
  },
  argTypes: {
    first: { control: false },
    header: { control: false },
    footer: { control: false },
    children: { control: false },

    placeholder: { control: 'text' },

    '__props:header': {
      control: 'radio',
      options: ['undefined', 'ListHeader'],
    },
    ...argTypesFrom(ListHeaderMeta, {
      prefix: '__props:header:ListHeader.',
      exclude: ['listStyle', 'first'],
    }),

    '__props:footer': {
      control: 'radio',
      options: ['undefined', 'ListFooter'],
    },
    ...argTypesFrom(ListFooterMeta, {
      prefix: '__props:footer:ListFooter.',
      exclude: ['listStyle'],
    }),

    ...argTypesFrom(ListItemMeta, {
      prefix: '__props:children:ListItem.',
      exclude: ['listStyle', 'listPosition', 'dragActive'],
    }),
  },
  args: {
    placeholder: 'Placeholder text.',
    '__props:header:ListHeader.title': 'Header Title',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
  render: (args) => {
    const useListHeader = args['__props:header'] === 'ListHeader';
    const listHeaderProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:ListHeader.',
    );

    const useListFooter = args['__props:footer'] === 'ListFooter';
    const listFooterProps = collectPropsFromArgs<ListFooterProps>(
      args,
      '__props:footer:ListFooter.',
    );

    const listItemProps = collectPropsFromArgs<ListItemProps>(
      args,
      '__props:children:ListItem.',
    );

    return (
      <>
        <List
          {...args}
          first
          header={
            useListHeader ? <ListHeader {...listHeaderProps} /> : undefined
          }
          footer={
            useListFooter ? <ListFooter {...listFooterProps} /> : undefined
          }
        >
          <ListItem title="First Item" {...listItemProps} />
          <ListItem title="Middle Item" {...listItemProps} />
          <ListItem title="Last Item" {...listItemProps} />
        </List>
        <List
          {...args}
          header={
            useListHeader ? <ListHeader {...listHeaderProps} /> : undefined
          }
          footer={
            useListFooter ? <ListFooter {...listFooterProps} /> : undefined
          }
        >
          <ListItem title="Only Item" {...listItemProps} />
        </List>
      </>
    );
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const A0_Default: Story = {};

export const A1_Loading: Story = {
  args: {
    loading: true,
  },
};

export const AA1_InsetGrouped: Story = {
  args: {
    listStyle: 'insetGrouped',
  },
};

export const AA2_InsetGroupedWithHeaderAndFooter: Story = {
  args: {
    listStyle: 'insetGrouped',
    '__props:header': 'ListHeader',
    '__props:header:ListHeader.title': 'This is The Header Title',
    '__props:footer': 'ListFooter',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
};

export const AB1_Grouped: Story = {
  args: {
    listStyle: 'grouped',
  },
};

export const AB1_GroupedWithHeaderAndFooter: Story = {
  args: {
    listStyle: 'grouped',
    '__props:header': 'ListHeader',
    '__props:header:ListHeader.title': 'This is The Header Title',
    '__props:footer': 'ListFooter',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
};

export const AC1_Plain: Story = {
  parameters: {
    containerBackground: 'system',
  },
  args: {
    listStyle: 'plain',
  },
};

export const AC1_PlainWithHeader: Story = {
  parameters: {
    containerBackground: 'system',
  },
  args: {
    listStyle: 'plain',
    '__props:header': 'ListHeader',
    '__props:header:ListHeader.title': 'This is The Header Title',
  },
};

export const BA1_WithHeaderTitle: Story = {
  args: {
    '__props:header': 'ListHeader',
    '__props:header:ListHeader.title': 'This is The Header Title',
  },
};

export const BA2_WithHeaderTitleAndButton: Story = {
  args: {
    ...BA1_WithHeaderTitle.args,
    '__props:header:ListHeader.accessories':
      LIST_HEADER_ACCESSORIES_EXAMPLES['Single Button'],
  },
};

export const BA3_WithHeaderTitleAndButtonWithIcon: Story = {
  args: {
    ...BA1_WithHeaderTitle.args,
    '__props:header:ListHeader.accessories':
      LIST_HEADER_ACCESSORIES_EXAMPLES['Single Button with Icon'],
  },
};

export const BA9_GroupedWithHeaderTitleAndButtonWithIcon: Story = {
  args: {
    ...BA3_WithHeaderTitleAndButtonWithIcon.args,
    listStyle: 'grouped',
  },
};

export const BB1_WithHeaderProminentTitle: Story = {
  args: {
    '__props:header': 'ListHeader',
    '__props:header:ListHeader.title': 'This is The Header Title',
    '__props:header:ListHeader.titleStyle': 'prominent',
  },
};

export const BB2_WithHeaderProminentTitleAndButton: Story = {
  args: {
    ...BB1_WithHeaderProminentTitle.args,
    '__props:header:ListHeader.accessories':
      LIST_HEADER_ACCESSORIES_EXAMPLES['Single Button'],
  },
};

export const BB3_WithHeaderProminentTitleAndButtonWithIcon: Story = {
  args: {
    ...BB1_WithHeaderProminentTitle.args,
    '__props:header:ListHeader.accessories':
      LIST_HEADER_ACCESSORIES_EXAMPLES['Single Button with Icon'],
  },
};

export const BB4_WithHeaderProminentTitleAndPlainButton: Story = {
  args: {
    ...BB1_WithHeaderProminentTitle.args,
    '__props:header:ListHeader.accessories':
      LIST_HEADER_ACCESSORIES_EXAMPLES['Single Plain Button'],
  },
};

export const BB5_WithHeaderProminentTitleAndPlainIconButton: Story = {
  args: {
    ...BB1_WithHeaderProminentTitle.args,
    '__props:header:ListHeader.accessories':
      LIST_HEADER_ACCESSORIES_EXAMPLES['Single Plain Icon Button'],
  },
};

export const BB6_WithHeaderProminentTitleAndMultipleButtons: Story = {
  args: {
    ...BB1_WithHeaderProminentTitle.args,
    '__props:header:ListHeader.accessories':
      LIST_HEADER_ACCESSORIES_EXAMPLES['Multiple Buttons'],
  },
};

export const BB9_GroupedWithHeaderProminentTitleAndMultipleButtons: Story = {
  args: {
    ...BB6_WithHeaderProminentTitleAndMultipleButtons.args,
    listStyle: 'grouped',
  },
};

export const CA1_WithFooterText: Story = {
  args: {
    '__props:footer': 'ListFooter',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
};

export const CA2_WithFooterTextElement: Story = {
  args: {
    '__props:footer': 'ListFooter',
    '__props:footer:ListFooter.text': (
      <Text>
        This is the footer text with a{' '}
        <Text
          link
          onPress={() => {
            Alert.alert('Link Pressed');
          }}
        >
          link
        </Text>
        .
      </Text>
    ),
  },
};

export const CA9_GroupedWithFooterText: Story = {
  args: {
    ...CA1_WithFooterText.args,
    listStyle: 'grouped',
  },
};

export const I0_EmptyList: Story = {
  args: {
    children: [],
    placeholder: 'Placeholder text.',
  },
  render: (args) => {
    return <List {...args} />;
  },
};

export const I1_LoadingEmptyList: Story = {
  ...I0_EmptyList,
  args: {
    ...I0_EmptyList.args,
    loading: true,
  },
};

export const I2_LoadingEmptyListWithoutPlaceholder: Story = {
  ...I0_EmptyList,
  args: {
    ...I0_EmptyList.args,
    placeholder: undefined,
    loading: true,
  },
};

export const IA1_InsetGroupedEmptyListWithPlaceholderText: Story = {
  ...I0_EmptyList,
  args: {
    ...I0_EmptyList.args,
    listStyle: 'insetGrouped',
  },
};

export const IA2_GroupedEmptyListWithPlaceholderText: Story = {
  ...I0_EmptyList,
  args: {
    ...I0_EmptyList.args,
    listStyle: 'grouped',
  },
};

export const IA3_PlainEmptyListWithPlaceholderText: Story = {
  ...I0_EmptyList,
  parameters: {
    ...I0_EmptyList,
    containerBackground: 'system',
  },
  args: {
    ...I0_EmptyList.args,
    listStyle: 'plain',
  },
};

export const IB1_EmptyListWithPlaceholderElement: Story = {
  ...I0_EmptyList,
  parameters: {
    containerStyle: {
      width: 360,
      alignSelf: 'center',
    },
  },
  args: {
    ...I0_EmptyList.args,
    placeholder: (
      <>
        This is the placeholder using{' '}
        <Text
          link
          onPress={() => {
            Alert.alert('Pressed');
          }}
        >
          a text element
        </Text>{' '}
        for the empty list.
      </>
    ),
  },
};

export const LA0_WithFlatList: Story = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    ...A0_Default.argTypes,
    __itemsCount: { control: { type: 'number' } },
  },
  args: {
    ...A0_Default.args,
    __itemsCount: 16,
  },
  render: (args) => {
    const useListHeader = args['__props:header'] === 'ListHeader';
    const listHeaderProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:ListHeader.',
    );

    const useListFooter = args['__props:footer'] === 'ListFooter';
    const listFooterProps = collectPropsFromArgs<ListFooterProps>(
      args,
      '__props:footer:ListFooter.',
    );

    const listItemProps = collectPropsFromArgs<ListItemProps>(
      args,
      '__props:children:ListItem.',
    );

    const data = Array.from({ length: args.__itemsCount }, (_, i) => ({
      key: `${i}`,
      title: `Item ${i}`,
    }));

    const isFirst = true;

    return (
      <FlatList
        ListHeaderComponent={() => (
          <>
            <ListPadding
              listStyle={args.listStyle}
              position="top"
              first={isFirst}
              withHeader={useListHeader}
            />
            {useListHeader && (
              <ListHeader listStyle={args.listStyle} {...listHeaderProps} />
            )}
          </>
        )}
        ListFooterComponent={() => (
          <>
            {useListFooter && (
              <ListFooter listStyle={args.listStyle} {...listFooterProps} />
            )}
            <ListPadding
              listStyle={args.listStyle}
              position="bottom"
              withFooter={useListFooter}
            />
          </>
        )}
        ListEmptyComponent={
          <ListPlaceholder
            listStyle={args.listStyle || 'insetGrouped'}
            placeholder={args.placeholder || ''}
          />
        }
        data={data}
        keyExtractor={(d) => d.key}
        renderItem={({ item, listPosition }) => (
          <ListItem
            listStyle={args.listStyle}
            listPosition={listPosition}
            title={item.title}
            {...listItemProps}
          />
        )}
      />
    );
  },
};

export const LA1_WithFlatListEmpty: Story = {
  ...LA0_WithFlatList,
  args: {
    ...LA0_WithFlatList.args,
    __itemsCount: 0,
  },
};

export const LA2_WithFlatListEditable: Story = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    ...Object.fromEntries(
      Object.entries(meta.argTypes || {}).map(([key, value]) => [
        key,
        !key.startsWith('__props:header') &&
        !key.startsWith('__props:children:ListItem.showGrabber') &&
        !key.startsWith('__props:children:ListItem.editButton')
          ? value
          : { control: false },
      ]),
    ),
    __itemsCount: { control: { type: 'number' } },
  },
  args: {
    __itemsCount: 100,
    '__props:children:ListItem.subtitle':
      'This is the subtitle. This is the subtitle. This is the subtitle.',
    '__props:children:ListItem.compact': true,
    '__props:children:ListItem.fixedHeight': true,
  },
  render: (args) => {
    const useListFooter = args['__props:footer'] === 'ListFooter';
    const listFooterProps = collectPropsFromArgs<ListFooterProps>(
      args,
      '__props:footer:ListFooter.',
    );

    const listItemProps = collectPropsFromArgs<ListItemProps>(
      args,
      '__props:children:ListItem.',
    );

    return (
      <WithFlatListEditableDemoComponent
        listProps={args}
        itemCount={args.__itemsCount}
        useListFooter={useListFooter}
        listFooterProps={listFooterProps}
        listItemProps={listItemProps}
      />
    );
  },
};

export const S0_WithSectionList: Story = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    ...A0_Default.argTypes,
    __sectionsCount: { control: { type: 'number' } },
    __itemsCount: { control: { type: 'number' } },
  },
  args: {
    ...A0_Default.args,
    '__props:header': 'ListHeader',
    '__props:header:ListHeader.title': '',
    __sectionsCount: 5,
    __itemsCount: 5,
  },
  render: (args) => {
    const useListHeader = args['__props:header'] === 'ListHeader';
    const listHeaderProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:ListHeader.',
    );

    const useListFooter = args['__props:footer'] === 'ListFooter';
    const listFooterProps = collectPropsFromArgs<ListFooterProps>(
      args,
      '__props:footer:ListFooter.',
    );

    const listItemProps = collectPropsFromArgs<ListItemProps>(
      args,
      '__props:children:ListItem.',
    );

    const data = Array.from({ length: args.__sectionsCount }, (_, i) => ({
      key: `${i}`,
      title: `Section ${i}`,
      data: Array.from({ length: args.__itemsCount }, (__, j) => ({
        key: `${i}-${j}`,
        name: `Item ${j}`,
      })),
    }));

    const processedData = data.map((d) => ({
      ...d,
      data: d.data.length > 0 ? d.data : ['empty' as const, ...d.data],
    }));

    return (
      <SectionList
        sections={processedData}
        keyExtractor={(item, _index) => (item === 'empty' ? 'empty' : item.key)}
        renderItem={({ item, listPosition }) =>
          item === 'empty' ? (
            <ListPlaceholder
              listStyle={args.listStyle || 'insetGrouped'}
              placeholder={args.placeholder || ''}
            />
          ) : (
            <ListItem
              listStyle={args.listStyle}
              title={item.name}
              {...listItemProps}
              listPosition={listPosition}
            />
          )
        }
        stickySectionHeadersEnabled={args.listStyle === 'plain'}
        renderSectionHeader={({ section, first }) => (
          <>
            <ListPadding
              listStyle={args.listStyle}
              position="top"
              first={first}
              withHeader={useListHeader}
            />
            {useListHeader && (
              <ListHeader
                listStyle={args.listStyle}
                title={section.title}
                {...listHeaderProps}
              />
            )}
          </>
        )}
        renderSectionFooter={({ section: _ }) => (
          <>
            {useListFooter && (
              <ListFooter listStyle={args.listStyle} {...listFooterProps} />
            )}
            <ListPadding
              listStyle={args.listStyle}
              position="bottom"
              withFooter={useListFooter}
            />
          </>
        )}
        ListEmptyComponent={
          <>
            <ListPadding
              listStyle={args.listStyle}
              position="top"
              first
              withHeader={false}
            />
            <ListPlaceholder
              listStyle={args.listStyle || 'insetGrouped'}
              placeholder={args.placeholder || ''}
            />
            <ListPadding
              listStyle={args.listStyle}
              position="bottom"
              withFooter={false}
            />
          </>
        }
      />
    );
  },
};

export const S1_WithSectionListEmptySections = {
  ...S0_WithSectionList,
  args: {
    ...S0_WithSectionList.args,
    __sectionsCount: 3,
    __itemsCount: 0,
  },
};
export const S2_WithSectionListEmptyList = {
  ...S0_WithSectionList,
  args: {
    ...S0_WithSectionList.args,
    __sectionsCount: 0,
    __itemsCount: 0,
  },
};

export const SA1_WithSectionListInsetGrouped: Story = {
  ...S0_WithSectionList,
  args: {
    ...S0_WithSectionList.args,
    listStyle: 'insetGrouped',
  },
};

export const SA2_WithSectionListInsetGroupedAndProminentHeader: Story = {
  ...SA1_WithSectionListInsetGrouped,
  args: {
    ...SA1_WithSectionListInsetGrouped.args,
    '__props:header:ListHeader.titleStyle': 'prominent',
  },
};

export const SA3_WithSectionListInsetGroupedAndFooter: Story = {
  ...SA1_WithSectionListInsetGrouped,
  args: {
    ...SA1_WithSectionListInsetGrouped.args,
    '__props:footer': 'ListFooter',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
};

export const SA4_WithSectionListInsetGroupedAndProminentHeaderAndFooter: Story =
  {
    ...SA1_WithSectionListInsetGrouped,
    args: {
      ...SA1_WithSectionListInsetGrouped.args,
      '__props:header:ListHeader.titleStyle': 'prominent',
      '__props:footer': 'ListFooter',
      '__props:footer:ListFooter.text': 'This is the footer text.',
    },
  };

export const SB1_WithSectionListGrouped: Story = {
  ...S0_WithSectionList,
  args: {
    ...S0_WithSectionList.args,
    listStyle: 'grouped',
  },
};

export const SB2_WithSectionListGroupedAndProminentHeader: Story = {
  ...SB1_WithSectionListGrouped,
  args: {
    ...SB1_WithSectionListGrouped.args,
    '__props:header:ListHeader.titleStyle': 'prominent',
  },
};

export const SB3_WithSectionListGroupedAndFooter: Story = {
  ...SB1_WithSectionListGrouped,
  args: {
    ...SB1_WithSectionListGrouped.args,
    '__props:footer': 'ListFooter',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
};

export const SB4_WithSectionListGroupedAndProminentHeaderAndFooter: Story = {
  ...SB1_WithSectionListGrouped,
  args: {
    ...SB1_WithSectionListGrouped.args,
    '__props:header:ListHeader.titleStyle': 'prominent',
    '__props:footer': 'ListFooter',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
};

export const SC1_WithSectionListPlain: Story = {
  ...S0_WithSectionList,
  parameters: {
    ...S0_WithSectionList.parameters,
    containerBackground: 'system',
  },
  args: {
    ...S0_WithSectionList.args,
    listStyle: 'plain',
  },
};

export const T1_InteractiveAddAndRemoveItem: Story = {
  args: {
    __layoutAnimationDuration: 300,
  },
  render: (args) => {
    const useListHeader = args['__props:header'] === 'ListHeader';
    const listHeaderProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:ListHeader.',
    );

    const useListFooter = args['__props:footer'] === 'ListFooter';
    const listFooterProps = collectPropsFromArgs<ListFooterProps>(
      args,
      '__props:footer:ListFooter.',
    );

    const listItemProps = collectPropsFromArgs<ListItemProps>(
      args,
      '__props:children:ListItem.',
    );

    return (
      <InteractiveAddRemoveItemComponent
        listProps={args}
        useListHeader={useListHeader}
        listHeaderProps={listHeaderProps}
        useListFooter={useListFooter}
        listFooterProps={listFooterProps}
        listItemProps={listItemProps}
        layoutAnimationDuration={args.__layoutAnimationDuration}
      />
    );
  },
};

export const T1_InteractiveAddAndRemoveItemWithFlatList: Story = {
  parameters: {
    storyContainer: 'basic',
  },
  args: {
    __layoutAnimationDuration: 300,
  },
  render: (args) => {
    const useListHeader = args['__props:header'] === 'ListHeader';
    const listHeaderProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:ListHeader.',
    );

    const useListFooter = args['__props:footer'] === 'ListFooter';
    const listFooterProps = collectPropsFromArgs<ListFooterProps>(
      args,
      '__props:footer:ListFooter.',
    );

    const listItemProps = collectPropsFromArgs<ListItemProps>(
      args,
      '__props:children:ListItem.',
    );

    return (
      <InteractiveAddRemoveItemWithFlatListComponent
        listProps={args}
        useListHeader={useListHeader}
        listHeaderProps={listHeaderProps}
        useListFooter={useListFooter}
        listFooterProps={listFooterProps}
        listItemProps={listItemProps}
        layoutAnimationDuration={args.__layoutAnimationDuration}
      />
    );
  },
};

function WithFlatListEditableDemoComponent({
  listProps,
  itemCount,
  useListFooter,
  listFooterProps,
  listItemProps,
}: {
  listProps: ListProps;
  itemCount: number;
  useListFooter: boolean;
  listFooterProps: Partial<ListFooterProps>;
  listItemProps: Partial<ListItemProps>;
}) {
  const uiPlatform = useUIPlatform();
  const windowDimensions = useWindowDimensions();

  const [data, setData] = useState<{ key: string; title: string }[]>([]);

  useEffect(() => {
    setData(
      Array.from({ length: itemCount }, (_, i) => ({
        key: `${i}`,
        title: `Item ${i}`,
      })),
    );
  }, [itemCount]);

  const [editing, setEditing] = useState(false);

  const keyExtractor = useCallback(
    (item: (typeof data)[number], _index: number) => {
      return item.key;
    },
    [],
  );

  const renderItem = useCallback<RenderItem<(typeof data)[number]>>(
    ({ item, listPosition, drag, isDragActive }) => (
      <ListItem
        listStyle={listProps.listStyle}
        listPosition={listPosition}
        title={item.title}
        dragActive={isDragActive}
        onGrabberHold={drag}
        onEditButtonPress={() => {
          Alert.alert(`Remove ${item.key}?`, undefined, [
            {
              text: 'Cancel',
              style: 'cancel',
              isPreferred: false,
              onPress: () => {},
            },
            {
              text: 'Remove',
              style: 'destructive',
              isPreferred: true,
              onPress: () => {
                configureNextLayoutAnimation({
                  duration: 100,
                });
                setData((prevData) =>
                  prevData.filter((prevItem) => prevItem.key !== item.key),
                );
              },
            },
          ]);
        }}
        {...listItemProps}
      />
    ),
    [listItemProps, listProps.listStyle],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => {
      const height = getListItemHeight(uiPlatform, {
        subtitle: listItemProps.subtitle,
        compact: listItemProps.compact,
        fontScale: windowDimensions.fontScale,
      });

      return { length: height, offset: height * index, index };
    },
    [
      uiPlatform,
      listItemProps.compact,
      listItemProps.subtitle,
      windowDimensions.fontScale,
    ],
  );

  const handleDragEnd = useCallback(
    ({ data: reorderedData }: DragEndParams<(typeof data)[number]>) => {
      setData(reorderedData);
    },
    [],
  );

  const contentContainerStyle = useMemo<
    React.ComponentProps<typeof FlatList>['containerStyle']
  >(
    () => ({
      paddingTop: getListPadding(uiPlatform, {
        listStyle: listProps.listStyle,
        position: 'top',
        withHeader: true,
        first: true,
      }),
      paddingBottom: getListPadding(uiPlatform, {
        listStyle: listProps.listStyle,
        position: 'bottom',
        withFooter: useListFooter,
      }),
    }),
    [uiPlatform, listProps.listStyle, useListFooter],
  );

  return (
    <ListItemPropsContextProvider
      value={useMemo(
        () => ({
          showGrabber: editing,
          disableOnPress: editing,
          hideTrailingContents: editing,
          editButton: editing ? 'remove' : undefined,
        }),
        [editing],
      )}
    >
      <FlatList
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={
          <ListHeader
            title="Items"
            titleStyle="prominent"
            accessories={
              <Button
                label={editing ? 'Done' : 'Edit'}
                onPress={() => setEditing((v) => !v)}
              />
            }
          />
        }
        ListFooterComponent={
          useListFooter ? <ListFooter {...listFooterProps} /> : undefined
        }
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={listItemProps.fixedHeight ? getItemLayout : undefined}
        onDragEnd={handleDragEnd}
      />
    </ListItemPropsContextProvider>
  );
}

function InteractiveAddRemoveItemComponent({
  listProps,
  useListHeader,
  listHeaderProps,
  useListFooter,
  listFooterProps,
  listItemProps,
  layoutAnimationDuration,
}: {
  listProps: ListProps;
  useListHeader: boolean;
  listHeaderProps: Partial<ListHeaderProps>;
  useListFooter: boolean;
  listFooterProps: Partial<ListFooterProps>;
  listItemProps: Partial<ListItemProps>;
  layoutAnimationDuration: number;
}) {
  const [itemsCount, setItemsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <List
        first
        loading={loading}
        {...listProps}
        header={useListHeader ? <ListHeader {...listHeaderProps} /> : undefined}
        footer={useListFooter ? <ListFooter {...listFooterProps} /> : undefined}
      >
        {Array.from({ length: itemsCount }).map((_, i) => (
          <ListItem key={`${i}`} title={`Item ${i}`} {...listItemProps} />
        ))}
      </List>
      <List>
        <ListItem
          button
          title="Add Item"
          onPress={() => {
            configureNextLayoutAnimation({
              duration: layoutAnimationDuration,
            });
            setItemsCount((n) => n + 1);
            setLoading(false);
          }}
        />
        <ListItem
          button
          title="Add 5 Items"
          onPress={() => {
            configureNextLayoutAnimation({
              duration: layoutAnimationDuration,
            });
            setItemsCount((n) => n + 5);
            setLoading(false);
          }}
        />
        <ListItem
          button
          destructive
          disabled={itemsCount <= 0}
          title="Remove Item"
          onPress={() => {
            configureNextLayoutAnimation({
              duration: layoutAnimationDuration,
            });
            setItemsCount((n) => (n > 0 ? n - 1 : n));
            setLoading(false);
          }}
        />
        <ListItem
          button
          destructive
          disabled={itemsCount <= 0}
          title="Remove All Items"
          onPress={() => {
            configureNextLayoutAnimation({
              duration: layoutAnimationDuration,
            });
            setItemsCount(0);
            setLoading(false);
          }}
        />
      </List>

      <List>
        <ListItem
          title="Loading"
          accessories={<Switch value={loading} onValueChange={setLoading} />}
        />
      </List>
    </>
  );
}

function InteractiveAddRemoveItemWithFlatListComponent({
  listProps,
  useListHeader,
  listHeaderProps,
  useListFooter,
  listFooterProps,
  listItemProps,
  layoutAnimationDuration,
}: {
  listProps: ListProps;
  useListHeader: boolean;
  listHeaderProps: Partial<ListHeaderProps>;
  useListFooter: boolean;
  listFooterProps: Partial<ListFooterProps>;
  listItemProps: Partial<ListItemProps>;
  layoutAnimationDuration: number;
}) {
  const [itemsCount, setItemsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const data = Array.from({ length: itemsCount }, (_, i) => ({
    key: `${i}`,
    title: `Item ${i}`,
  }));

  const isFirst = true;

  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          <ListPadding
            listStyle={listProps.listStyle}
            position="top"
            first={isFirst}
            withHeader={useListHeader}
          />
          {useListHeader && (
            <ListHeader listStyle={listProps.listStyle} {...listHeaderProps} />
          )}
        </>
      )}
      ListFooterComponent={() => (
        <>
          {useListFooter && (
            <ListFooter listStyle={listProps.listStyle} {...listFooterProps} />
          )}
          <ListPadding
            listStyle={listProps.listStyle}
            position="bottom"
            withFooter={useListFooter}
          />
          <List>
            <ListItem
              button
              title="Add Item"
              onPress={() => {
                configureNextLayoutAnimation({
                  duration: layoutAnimationDuration,
                });
                setItemsCount((n) => n + 1);
                setLoading(false);
              }}
            />
            <ListItem
              button
              title="Add 5 Items"
              onPress={() => {
                configureNextLayoutAnimation({
                  duration: layoutAnimationDuration,
                });
                setItemsCount((n) => n + 5);
                setLoading(false);
              }}
            />
            <ListItem
              button
              destructive
              disabled={itemsCount <= 0}
              title="Remove Item"
              onPress={() => {
                configureNextLayoutAnimation({
                  duration: layoutAnimationDuration,
                });
                setItemsCount((n) => (n > 0 ? n - 1 : n));
                setLoading(false);
              }}
            />
            <ListItem
              button
              destructive
              disabled={itemsCount <= 0}
              title="Remove All Items"
              onPress={() => {
                configureNextLayoutAnimation({
                  duration: layoutAnimationDuration,
                });
                setItemsCount(0);
                setLoading(false);
              }}
            />
          </List>

          <List
            footer={
              itemsCount > 0 && (
                <List.Footer text="Currently, the loading state is not implemented while using FlatList with items." />
              )
            }
          >
            <ListItem
              title="Loading"
              accessories={
                <Switch
                  value={loading}
                  onValueChange={setLoading}
                  disabled={itemsCount > 0}
                />
              }
            />
          </List>
        </>
      )}
      ListEmptyComponent={
        <ListPlaceholder
          listStyle={listProps.listStyle || 'insetGrouped'}
          placeholder={listProps.placeholder || ''}
          loading={loading}
        />
      }
      data={data}
      keyExtractor={(d) => d.key}
      renderItem={({ item, listPosition }) => (
        <ListItem
          listStyle={listProps.listStyle}
          listPosition={listPosition}
          title={item.title}
          {...listItemProps}
        />
      )}
    />
  );
}
