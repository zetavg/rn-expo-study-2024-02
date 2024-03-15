import React from 'react';
import { Image, TouchableOpacity, View, ViewStyle } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import Text from '../Text';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'iOS UI/Button',
  component: Button,
  args: {
    label: 'Button',
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default meta;

export const Default: Meta<typeof Button> = {
  args: {},
  parameters: {},
};

export const All: Meta<typeof Button> = {
  render: (args) => (
    <>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button
          {...args}
          label="Button"
          buttonStyle="plain"
          controlSize="small"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="plain"
          controlSize="regular"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="plain"
          controlSize="medium"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="plain"
          controlSize="large"
        />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button
          {...args}
          label="Button"
          buttonStyle="gray"
          controlSize="small"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="gray"
          controlSize="regular"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="gray"
          controlSize="medium"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="gray"
          controlSize="large"
        />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button
          {...args}
          label="Button"
          buttonStyle="tinted"
          controlSize="small"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="tinted"
          controlSize="regular"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="tinted"
          controlSize="medium"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="tinted"
          controlSize="large"
        />
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button
          {...args}
          label="Button"
          buttonStyle="filled"
          controlSize="small"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="filled"
          controlSize="regular"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="filled"
          controlSize="medium"
        />
        <Button
          {...args}
          label="Button"
          buttonStyle="filled"
          controlSize="large"
        />
      </View>

      <Text />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        <Button {...args} label="Button" buttonStyle="plain" disabled />
        <Button {...args} label="Button" buttonStyle="gray" disabled />
        <Button {...args} label="Button" buttonStyle="tinted" disabled />
        <Button {...args} label="Button" buttonStyle="filled" disabled />
      </View>
    </>
  ),
  argTypes: {},
  parameters: {
    containerStyle: {
      gap: 16,
    },
  },
};

// export const BorderlessSmall: Meta<typeof Button> = {
//   args: {
//     label: 'Button',
//     buttonStyle: 'borderless',
//     controlSize: 'small',
//   },
//   parameters: {
//     specOverlay: (
//       <Image
//         source={require('./specs/light-borderless-small.png')}
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{ width: 66, height: 28 }}
//       />
//     ),
//   },
// };

// export const BorderlessRegular: Meta<typeof Button> = {
//   args: {
//     label: 'Button',
//     buttonStyle: 'borderless',
//     controlSize: 'regular',
//   },
//   parameters: {
//     specOverlay: (
//       <Image
//         source={require('./specs/light-borderless-regular.png')}
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{ width: 74, height: 34 }}
//       />
//     ),
//   },
// };

// export const BorderlessLarge: Meta<typeof Button> = {
//   args: {
//     label: 'Button',
//     buttonStyle: 'borderless',
//     controlSize: 'large',
//   },
//   parameters: {
//     specOverlay: (
//       <Image
//         source={require('./specs/light-borderless-large.png')}
//         // eslint-disable-next-line react-native/no-inline-styles
//         style={{ width: 92, height: 50 }}
//       />
//     ),
//   },
// };

// export const BorderedSmall: Meta<typeof Button> = {
//   args: {
//     label: 'Button',
//     buttonStyle: 'bordered',
//     controlSize: 'small',
//   },
//   parameters: {
//     // specOverlay: (
//     //   <Image
//     //     source={require('./specs/light-bordered-small.png')}
//     //     // eslint-disable-next-line react-native/no-inline-styles
//     //     style={{ width: 66, height: 28 }}
//     //   />
//     // ),
//   },
// };

// export const BorderedRegular: Meta<typeof Button> = {
//   args: {
//     label: 'Button',
//     buttonStyle: 'bordered',
//     controlSize: 'regular',
//   },
//   parameters: {
//     // specOverlay: (
//     //   <Image
//     //     source={require('./specs/light-bordered-regular.png')}
//     //     // eslint-disable-next-line react-native/no-inline-styles
//     //     style={{ width: 74, height: 34 }}
//     //   />
//     // ),
//   },
// };

// export const BorderedLarge: Meta<typeof Button> = {
//   args: {
//     label: 'Button',
//     buttonStyle: 'bordered',
//     controlSize: 'large',
//   },
//   parameters: {
//     // specOverlay: (
//     //   <Image
//     //     source={require('./specs/light-bordered-large.png')}
//     //     // eslint-disable-next-line react-native/no-inline-styles
//     //     style={{ width: 92, height: 50 }}
//     //   />
//     // ),
//   },
// };
