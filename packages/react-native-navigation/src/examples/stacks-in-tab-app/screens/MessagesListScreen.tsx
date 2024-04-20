import React, { useCallback, useMemo, useState } from 'react';

import {
  List,
  SegmentedControl,
  withLayoutAnimation,
} from '@rnstudy/react-native-ui';

import { useTabContentEventHandler } from '../../../contexts';
import { StackScreenContent } from '../../../screen-contents';
import HeaderControlButton from '../../../screen-contents/HeaderControlButton';
import { StackScreenProps } from '../../../types';
import { useExit } from '../contexts';
import { useStackNavigation } from '../hooks';

type Message = {
  id: string;
  title: string;
  read?: boolean;
};

export default function MessagesListScreen({ ..._ }: StackScreenProps) {
  const exit = useExit();

  const stackNavigation = useStackNavigation();

  const [filter, setFilter] = useState<'unread' | 'all'>('all');
  const changeFilter = useMemo(
    () =>
      withLayoutAnimation(setFilter, {
        onlyOnNativePlatforms: ['ios'],
      }),
    [],
  );

  useTabContentEventHandler(
    useCallback(
      (payload: unknown) => {
        if (typeof payload !== 'object') return;

        const { type, filter: filterFromEvent } = payload as {
          type: unknown;
          filter: unknown;
        };

        if (type !== 'messages-filter') return;

        if (filterFromEvent === 'unread' || filterFromEvent === 'all') {
          changeFilter(filterFromEvent);
        }
      },
      [changeFilter],
    ),
  );

  const [messages] = useState<Message[]>(
    Array.from({ length: 100 }, (__, i) => ({
      id: `${i}`,
      title: `Message ${i}`,
      read: Math.random() > 0.5,
    })),
  );

  const filteredMessages = useMemo(() => {
    switch (filter) {
      case 'all': {
        return messages;
      }

      case 'unread': {
        return messages.filter((message) => !message.read);
      }
    }
  }, [messages, filter]);

  return (
    <StackScreenContent
      title="Messages"
      grouped={false}
      headerTitleContent={
        <SegmentedControl
          options={{ unread: 'Unread', all: 'All' }}
          value={filter}
          onValueChange={changeFilter}
        />
      }
      headerHeadingContent={
        exit ? <HeaderControlButton label="Exit" onPress={exit} /> : undefined
      }
    >
      <StackScreenContent.ScrollView>
        <List first listStyle="plain">
          {filteredMessages.map((message) => (
            <List.Item
              key={message.id}
              title={message.title}
              onPress={() =>
                stackNavigation.push('MessageDetail', {
                  id: message.id,
                  title: message.title,
                })
              }
            />
          ))}
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
