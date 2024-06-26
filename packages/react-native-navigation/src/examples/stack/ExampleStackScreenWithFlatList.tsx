import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert } from 'react-native';

import {
  FlatListDragEndParams,
  FlatListRef,
  FlatListRenderItem,
} from '@rnstudy/react-native-lists';
import {
  List,
  ListItem,
  ListItemPropsContextProvider,
  ListPadding,
  Menu,
  useListItemHeight,
  withLayoutAnimation,
} from '@rnstudy/react-native-ui';

import { StackScreenContent } from '../../screen-contents';
import { StackScreenProps } from '../../types';

type Data = { key: string; title: string };

export default function ExampleStackScreenWithFlatList({
  route,
}: StackScreenProps<{ inverted?: boolean } | undefined>) {
  const inverted = route.params?.inverted ?? false;

  const [listStyle, setListStyle] =
    useState<React.ComponentProps<typeof List>['listStyle']>('plain');
  const itemCount = 100;

  const [data, setData] = useState<Data[]>([]);

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

  const renderItem = useCallback<FlatListRenderItem<Data>>(
    ({ item, listPosition, drag, isDragActive }) => (
      <ListItem
        fixedHeight
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
                withLayoutAnimation(setData)((prevData) =>
                  prevData.filter((prevItem) => prevItem.key !== item.key),
                );
              },
            },
          ]);
        }}
      />
    ),
    [],
  );

  const listItemHeight = useListItemHeight({});
  const getItemLayout = useCallback(
    (_: unknown, index: number) => {
      const height = listItemHeight;

      return { length: height, offset: height * index, index };
    },
    [listItemHeight],
  );

  const handleDragEnd = useCallback(
    ({ data: reorderedData }: FlatListDragEndParams<(typeof data)[number]>) => {
      setData(reorderedData);
    },
    [],
  );

  const scrollViewRef = useRef<FlatListRef<Data>>(null);

  return (
    <StackScreenContent
      title={
        inverted
          ? 'Stack Screen with FlatList (Inverted)'
          : 'Stack Screen with FlatList'
      }
      headerLargeTitle={!inverted}
      grouped={listStyle !== 'plain'}
      headerTrailingContent={
        editing ? (
          <StackScreenContent.HeaderControlButton
            label="Done"
            primary
            onPress={() => setEditing(false)}
          />
        ) : (
          <>
            {!inverted && (
              <StackScreenContent.HeaderControlButton
                label="Edit"
                onPress={() => setEditing(true)}
              />
            )}
            <Menu
              items={[
                {
                  title: 'Scroll to Start',
                  handler: () => scrollViewRef?.current?.scrollToStart(),
                },
                {
                  title: 'Scroll to End',
                  handler: () => scrollViewRef?.current?.scrollToEnd(),
                },
                {
                  title: 'Scroll to Index 20',
                  handler: () =>
                    scrollViewRef?.current?.scrollToIndex({ index: 20 }),
                },
                {
                  title: 'Scroll to Index 20 (View Position: 0.5)',
                  handler: () =>
                    scrollViewRef?.current?.scrollToIndex({
                      index: 20,
                      viewPosition: 0.5,
                    }),
                },
                {
                  title: 'Scroll to Index 20 (View Position: 1)',
                  handler: () =>
                    scrollViewRef?.current?.scrollToIndex({
                      index: 20,
                      viewPosition: 1,
                    }),
                },
                {
                  title: 'List Style',
                  items: [
                    {
                      title: 'Plain',
                      checked: listStyle === 'plain',
                      handler: () =>
                        withLayoutAnimation(setListStyle, {
                          onlyOnNativePlatforms: ['ios'],
                        })('plain'),
                    },
                    {
                      title: 'Grouped',
                      checked: listStyle === 'grouped',
                      handler: () =>
                        withLayoutAnimation(setListStyle, {
                          onlyOnNativePlatforms: ['ios'],
                        })('grouped'),
                    },
                    {
                      title: 'Inset Grouped',
                      checked: listStyle === 'insetGrouped',
                      handler: () =>
                        withLayoutAnimation(setListStyle, {
                          onlyOnNativePlatforms: ['ios'],
                        })('insetGrouped'),
                    },
                  ],
                },
              ]}
            >
              {(openMenu) => (
                <StackScreenContent.HeaderControlButton
                  label="More"
                  icon="_header_menu"
                  onPress={openMenu}
                />
              )}
            </Menu>
          </>
        )
      }
    >
      <ListItemPropsContextProvider
        value={useMemo(
          () => ({
            inverted,
            listStyle,
            showGrabber: editing,
            disableOnPress: editing,
            hideTrailingContents: editing,
            editButton: editing ? 'remove' : undefined,
          }),
          [inverted, listStyle, editing],
        )}
      >
        <StackScreenContent.FlatList<Data>
          ref={scrollViewRef}
          inverted={inverted}
          dragEnabled={editing}
          ListHeaderComponent={
            <>
              <ListPadding
                listStyle={listStyle}
                position="top"
                first
                withHeader
              />
              {/* <ListHeader
                listStyle={listStyle}
                title="Items"
                titleStyle="prominent"
                accessories={
                  <Button
                    label={editing ? 'Done' : 'Edit'}
                    onPress={() => setEditing((v) => !v)}
                  />
                }
              /> */}
            </>
          }
          ListFooterComponent={
            <>
              {/* {useListFooter && (
                <ListFooter
                  listStyle={listProps.listStyle}
                  {...listFooterProps}
                />
              )} */}
              <ListPadding
                listStyle={listStyle}
                position="bottom"
                withFooter={false}
              />
            </>
          }
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          onDragEnd={handleDragEnd}
        />
      </ListItemPropsContextProvider>
    </StackScreenContent>
  );
}
