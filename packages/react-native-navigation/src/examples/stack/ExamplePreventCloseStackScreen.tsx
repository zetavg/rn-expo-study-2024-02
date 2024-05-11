import React, { useRef, useState } from 'react';

import { List, Switch, useActionSheet } from '@rnstudy/react-native-ui';

import { usePreventClose } from '../../hooks';
import { StackScreenContent } from '../../screen-contents';
import { StackScreenProps } from '../../types';

export default function ExamplePreventCloseStackScreen({
  navigation,
  route,
}: StackScreenProps<{ preventClose?: boolean } | undefined>) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(
    route.params?.preventClose ?? true,
  );
  const hasUnsavedChangesRef = useRef(hasUnsavedChanges);
  hasUnsavedChangesRef.current = hasUnsavedChanges;

  const [isSaving, setIsSaving] = useState(false);

  const { showActionSheet } = useActionSheet();

  usePreventClose(hasUnsavedChangesRef, (confirmClose) => {
    showActionSheet(
      [
        {
          name: 'Discard Changes',
          destructive: true,
          onSelect: confirmClose,
        },
      ],
      {
        title: 'Are you sure you want to discard your changes?',
        cancelText: 'Keep Editing',
      },
    );
  });

  return (
    <StackScreenContent
      title="Prevent Close"
      headerTrailingContent={
        <StackScreenContent.HeaderControlButton
          label="Save"
          primary
          onPress={async () => {
            setIsSaving(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Assume we have the changes saved...
            hasUnsavedChangesRef.current = false;
            navigation.goBack();
          }}
        />
      }
      headerLeadingContent={
        <StackScreenContent.HeaderControlButton
          label="Cancel"
          onPress={() => {
            navigation.goBack();
          }}
        />
      }
    >
      <StackScreenContent.ScrollView>
        <List first loading={isSaving}>
          <List.Item
            title="Has Unsaved Changes"
            accessories={
              <Switch
                value={hasUnsavedChanges}
                onValueChange={setHasUnsavedChanges}
              />
            }
          />
        </List>

        <List loading={isSaving}>
          <List.Item
            title="Navigate to Another Screen"
            navigationLink
            onPress={() => navigation.push(route.name, { preventClose: false })}
          />
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}
