import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  LayoutAnimation,
  Switch,
  useWindowDimensions,
} from 'react-native';

import { Icon } from '@rnstudy/react-icons';
import {
  DragEndParams,
  FlatList,
  RenderItem,
  SectionList,
} from '@rnstudy/react-native-lists';
import { collectPropsFromArgs } from '@rnstudy/react-utils/src';
import { Meta } from '@rnstudy/storybook-rn-types';

import { Button } from '../Button';
import Select from '../Select';

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
  ListItemPropsContext,
  ListPadding,
  ListProps,
} from './.';

const meta: Meta<typeof List> = {
  title: 'iOS UI/List',
  component: List,
  parameters: {
    containerStyle: {
      alignSelf: 'stretch',
    },
    containerBackground: 'grouped',
  },
  argTypes: {
    first: { control: false },
    children: { control: false },

    '__props:header:ListHeader': { control: 'boolean' },
    '__props:header:ListHeader.title': {
      control: 'text',
    },
    '__props:header:ListHeader.titleStyle': {
      control: 'select',
      options: ['default', 'prominent'],
    },
    '__props:header:ListHeader.accessories': {
      control: 'select',
      options: [
        'undefined',
        'singleButton',
        'singleButtonWithIcon',
        'multipleButtons',
      ],
      mapping: {
        undefined,
        singleButton: <Button label="Button" />,
        singleButtonWithIcon: <Button label="Add" icon="_plus" />,
        multipleButtons: (
          <>
            <Button buttonStyle="gray" icon="_list_edit" />
            <Button buttonStyle="tinted" label="Add" icon="_plus" />
          </>
        ),
      },
    },

    '__props:footer:ListFooter': { control: 'boolean' },
    '__props:footer:ListFooter.text': {
      control: 'text',
    },

    '__props:children:ListItem.title': { control: 'text' },
    '__props:children:ListItem.subtitle': { control: 'text' },
    '__props:children:ListItem.icon': {
      control: 'select',
      options: ['undefined', 'star', 'airplane', 'heart'],
      mapping: {
        undefined,
        star: <Icon name="star" color="gray" />,
        airplane: ({ backgroundColor }: { backgroundColor: string }) => (
          <Icon
            name="airplane"
            color={backgroundColor}
            backgroundColor="orange"
          />
        ),
        heart: <Icon name="heart" color="red" />,
      },
    },
    '__props:children:ListItem.compact': { control: 'boolean' },
    '__props:children:ListItem.subtitleOnTop': { control: 'boolean' },
    '__props:children:ListItem.detail': { control: 'text' },
    '__props:children:ListItem.accessories': {
      control: 'select',
      options: ['undefined', 'switch', 'select'],
      mapping: {
        undefined,
        switch: <Switch value={true} />,
        select: (
          <Select
            options={{
              js: { label: 'JavaScript' },
              ts: { label: 'TypeScript', icon: 'star.outline' as const },
              swift: { label: 'Swift' },
              kotlin: { label: 'Kotlin' },
            }}
            value={undefined}
            onValueChange={() => {}}
          />
        ),
      },
    },
    '__props:children:ListItem.navigationLink': { control: 'boolean' },
    '__props:children:ListItem.onPress': {
      control: 'select',
      options: ['undefined', 'function'],
      mapping: {
        undefined,
        function: () => {
          Alert.alert('Pressed');
        },
      },
    },
    '__props:children:ListItem.showGrabber': { control: 'boolean' },
    '__props:children:ListItem.editButton': {
      control: 'select',
      options: [undefined, 'unselected', 'selected', 'add', 'remove'],
    },
    '__props:children:ListItem.fixedHeight': { control: 'boolean' },
  },
  args: {
    '__props:header:ListHeader.title': 'Header Title',
    '__props:footer:ListFooter.text': 'This is the footer text.',
  },
  render: (args) => {
    const useListHeader = !!args['__props:header:ListHeader'];
    const listHeaderProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:ListHeader.',
    );

    const useListFooter = !!args['__props:footer:ListFooter'];
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
            args['__props:header:ListHeader'] ? (
              <ListHeader {...listHeaderProps} />
            ) : undefined
          }
          footer={
            args['__props:footer:ListFooter'] ? (
              <ListFooter {...listFooterProps} />
            ) : undefined
          }
        >
          <ListItem title="Only Item" {...listItemProps} />
        </List>
      </>
    );
  },
};

export default meta;

export const Default: Meta<typeof List> = {};

export const WithFlatList: Meta<typeof List> = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    ...Default.argTypes,
    __itemsCount: { control: { type: 'number' } },
  },
  args: {
    ...Default.args,
    __itemsCount: 30,
  },
  render: (args) => {
    const useListHeader = !!args['__props:header:ListHeader'];
    const listHeaderProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:ListHeader.',
    );

    const useListFooter = !!args['__props:footer:ListFooter'];
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

    return (
      <FlatList
        contentContainerStyle={{
          paddingTop: getListPadding({
            listStyle: args.listStyle,
            position: 'top',
            withHeader: useListHeader,
            first: true,
          }),
          paddingBottom: getListPadding({
            listStyle: args.listStyle,
            position: 'bottom',
            withFooter: useListFooter,
          }),
        }}
        ListHeaderComponent={
          useListHeader ? <ListHeader {...listHeaderProps} /> : undefined
        }
        ListFooterComponent={
          useListFooter ? <ListFooter {...listFooterProps} /> : undefined
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

export const WithFlatListEditable: Meta<typeof List> = {
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
    const useListFooter = !!args['__props:footer:ListFooter'];
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

export const WithSectionList: Meta<typeof List> = {
  parameters: {
    storyContainer: 'basic',
  },
  argTypes: {
    ...Default.argTypes,
    __sectionsCount: { control: { type: 'number' } },
    __itemsCount: { control: { type: 'number' } },
  },
  args: {
    ...Default.args,
    '__props:header:ListHeader': true,
    '__props:header:ListHeader.title': '',
    __sectionsCount: 5,
    __itemsCount: 5,
  },
  render: (args) => {
    const useListHeader = !!args['__props:header:ListHeader'];
    const listHeaderProps = collectPropsFromArgs<ListHeaderProps>(
      args,
      '__props:header:ListHeader.',
    );

    const useListFooter = !!args['__props:footer:ListFooter'];
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

    return (
      <SectionList
        sections={data}
        keyExtractor={(item, _index) => item.key}
        renderItem={({ item, listPosition }) => (
          <ListItem
            listStyle={args.listStyle}
            title={item.name}
            {...listItemProps}
            listPosition={listPosition}
          />
        )}
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
                LayoutAnimation.configureNext({
                  ...LayoutAnimation.Presets.easeInEaseOut,
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
    [listItemProps],
  );

  const windowDimensions = useWindowDimensions();

  const getItemLayout = useCallback(
    (_: unknown, index: number) => {
      const height = getListItemHeight({
        subtitle: listItemProps.subtitle,
        compact: listItemProps.compact,
        fontScale: windowDimensions.fontScale,
      });

      return { length: height, offset: height * index, index };
    },
    [listItemProps.compact, listItemProps.subtitle, windowDimensions.fontScale],
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
      paddingTop: getListPadding({
        listStyle: listProps.listStyle,
        position: 'top',
        withHeader: true,
        first: true,
      }),
      paddingBottom: getListPadding({
        listStyle: listProps.listStyle,
        position: 'bottom',
        withFooter: useListFooter,
      }),
    }),
    [listProps.listStyle, useListFooter],
  );

  return (
    <ListItemPropsContext.Provider
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
    </ListItemPropsContext.Provider>
  );
}
