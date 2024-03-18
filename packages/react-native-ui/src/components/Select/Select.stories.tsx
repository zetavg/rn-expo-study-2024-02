import React, { useState } from 'react';
import { Alert, View } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import { Button } from '../Button';
import Text from '../Text';

import Select, { Props } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Components/Select',
  component: Select,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  args: {
    options: {
      js: { label: 'JavaScript' },
      ts: { label: 'TypeScript', icon: 'star.outline' as const },
      swift: { label: 'Swift' },
      kotlin: { label: 'Kotlin' },
    },
  },
};

export default meta;

export const Default: Meta<typeof Select> = {};

export const CustomPlaceholder: Meta<typeof Select> = {
  args: {
    placeholder: 'Choose your favorite language',
  },
};

function ExampleInteractiveComponent<T extends string>({
  showInfo,
  ...props
}: Props<T> & { showInfo?: boolean }) {
  const [value, setValue] = useState<T | undefined>(props.value);
  return (
    <>
      <Select {...props} value={value} onChangeValue={setValue} />
      {showInfo && (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ marginTop: 12, gap: 4 }}>
          <Text>Selected value: {value || 'undefined'}</Text>
          <Button label="Clear Selection" onPress={() => setValue(undefined)} />
        </View>
      )}
    </>
  );
}

export const InteractiveExample: Meta<typeof Select> = {
  render: (args) => <ExampleInteractiveComponent showInfo {...args} />,
};

export const WithAdditionalActions: Meta<typeof Select> = {
  args: {
    additionalActions: [
      {
        label: 'More Languages...',
        action: () => {
          Alert.alert('"More Languages..." Pressed');
        },
      },
      {
        label: 'Edit Languages',
        icon: '_edit',
        action: () => {
          Alert.alert('"Edit Languages" Pressed');
        },
      },
    ],
  },
  render: (args) => <ExampleInteractiveComponent {...args} />,
};

export const Alignment: Meta<typeof Select> = {
  render: (args) => (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: 300,
        borderWidth: 1,
        borderColor: '#555555',
        padding: 8,
        borderRadius: 4,
      }}
    >
      <Text variant="subheadline">Align: left</Text>
      <ExampleInteractiveComponent {...args} align="left" />

      <Text />

      <Text variant="subheadline">Align: center</Text>
      <ExampleInteractiveComponent {...args} align="center" />

      <Text />

      <Text variant="subheadline">Align: right</Text>
      <ExampleInteractiveComponent {...args} align="right" />
    </View>
  ),
};

export const LongLabel: Meta<typeof Select> = {
  args: {
    options: {
      long: {
        label:
          'This is a very very very very long label that should be truncated',
      },
      long2: {
        label:
          'This is another very very very very long label that should be truncated',
        icon: 'star.outline',
      },
    },
    value: 'long',
    style: { maxWidth: 300 },
  },
  render: (args) => <ExampleInteractiveComponent {...args} />,
};

export const LongListOfOptions: Meta<typeof Select> = {
  args: {
    options: {
      ...Object.fromEntries(
        Array.from({ length: 100 }, (_, i) => [
          `option-${i}`,
          { label: `Option ${i}` },
        ]),
      ),
    },
    value: 'option-0',
  },
  render: (args) => <ExampleInteractiveComponent {...args} />,
};
