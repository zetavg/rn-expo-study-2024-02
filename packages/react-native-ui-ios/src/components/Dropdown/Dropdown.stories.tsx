import React, { useState } from 'react';
import { View } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import { Button } from '../Button';
import Text from '../Text';

import Dropdown from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'iOS UI/Dropdown',
  component: Dropdown,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  args: {
    options: {
      js: { label: 'JavaScript' },
      ts: { label: 'TypeScript', icon: 'star.outline' as const },
      py: { label: 'Python' },
      java: { label: 'Java' },
      cpp: { label: 'C++' },
      csharp: { label: 'C#' },
      swift: { label: 'Swift' },
      kotlin: { label: 'Kotlin' },
      go: { label: 'Go' },
      rust: { label: 'Rust' },
      ruby: { label: 'Ruby' },
      php: { label: 'PHP' },
      html: { label: 'HTML' },
      css: { label: 'CSS' },
    },
  },
};

export default meta;

export const Default: Meta<typeof Dropdown> = {};

export const Example: Meta<typeof Dropdown> = {
  render: () => <ExampleComponent />,
};

function ExampleComponent() {
  const options = {
    js: { label: 'JavaScript' },
    ts: { label: 'TypeScript', icon: 'star.outline' as const },
    py: { label: 'Python' },
    java: { label: 'Java' },
    cpp: { label: 'C++' },
    csharp: { label: 'C#' },
    swift: { label: 'Swift' },
    kotlin: { label: 'Kotlin' },
    go: { label: 'Go' },
    rust: { label: 'Rust' },
    ruby: { label: 'Ruby' },
    php: { label: 'PHP' },
    html: { label: 'HTML' },
    css: { label: 'CSS' },
  };
  const [value, setValue] = useState<keyof typeof options>();
  return (
    <>
      <Dropdown
        value={value}
        onChangeValue={setValue}
        options={options}
        align="center"
      />
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ marginTop: 12, gap: 4 }}>
        <Text>Selected value: {value || 'undefined'}</Text>
        <Button label="Clear Selection" onPress={() => setValue(undefined)} />
      </View>
    </>
  );
}

export const LongLabel: Meta<typeof Dropdown> = {
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
};
