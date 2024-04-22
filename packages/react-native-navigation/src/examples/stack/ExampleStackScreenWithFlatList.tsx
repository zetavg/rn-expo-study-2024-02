import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, FlatList, Linking } from 'react-native';

import {
  Form,
  FormGroup,
  getListItemHeight,
  List,
  ListHeader,
  ListItem,
  ListItemPropsContextProvider,
  ListPadding,
  Menu,
  RNTextInput,
  SegmentedControl,
  Text,
  useUIPlatform,
  withLayoutAnimation,
} from '@rnstudy/react-native-ui';
import { objectMap } from '@rnstudy/react-utils';

import {
  FlatListDragEndParams,
  FlatListProps,
  FlatListRenderItem,
  StackScreenContent,
  StackScreenContentProps,
} from '../../screen-contents';
import { StackScreenProps } from '../../types';

export default function ExampleStackScreenWithFlatList({
  route,
  navigation,
}: StackScreenProps) {
  const listStyle = 'insetGrouped' as const;
  const itemCount = 100;

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

  const renderItem = useCallback<FlatListRenderItem<(typeof data)[number]>>(
    ({ item, listPosition, drag, isDragActive }) => (
      <ListItem
        listStyle={listStyle}
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
        // {...listItemProps}
      />
    ),
    [listStyle],
  );

  // const getItemLayout = useCallback(
  //   (_: unknown, index: number) => {
  //     const height = getListItemHeight(uiPlatform, {
  //       subtitle: listItemProps.subtitle,
  //       compact: listItemProps.compact,
  //       fontScale: windowDimensions.fontScale,
  //     });

  //     return { length: height, offset: height * index, index };
  //   },
  //   [
  //     uiPlatform,
  //     listItemProps.compact,
  //     listItemProps.subtitle,
  //     windowDimensions.fontScale,
  //   ],
  // );

  const handleDragEnd = useCallback(
    ({ data: reorderedData }: FlatListDragEndParams<(typeof data)[number]>) => {
      setData(reorderedData);
    },
    [],
  );

  const scrollViewRef = useRef<FlatList<(typeof data)[number]>>(null);

  return (
    <StackScreenContent
      headerLargeTitle
      headerSearchBarOptions={{}}
      headerTrailingContent={
        <>
          <Menu
            items={[
              {
                title: 'Scroll to Top',
                handler: () =>
                  scrollViewRef?.current?.scrollToIndex({ index: 0 }),
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
      }
    >
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
        <StackScreenContent.FlatList
          ref={scrollViewRef}
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
          // getItemLayout={listItemProps.fixedHeight ? getItemLayout : undefined}
          onDragEnd={handleDragEnd}
        />
      </ListItemPropsContextProvider>
    </StackScreenContent>
  );
}
