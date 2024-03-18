import React from 'react';
import { Image, Switch, Text, View, ViewStyle } from 'react-native';

import type { Meta } from '@rnstudy/storybook-rn-types';

import Dropdown, { DropdownOption } from '../Dropdown';

import ListItem from './ListItem';

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

export const WithSwitch: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    navigationLink: false,
    accessories: <UncontrolledSwitch />,
  },
};

export const WithDropdown: Meta<typeof ListItem> = {
  args: {
    title: 'Title',
    navigationLink: false,
    accessories: <UncontrolledDropdown />,
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

function UncontrolledDropdown({
  value: defaultValue,
  options = SAMPLE_DROPDOWN_OPTIONS,
  ...restProps
}: Partial<React.ComponentProps<typeof Dropdown>>) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <Dropdown
      {...restProps}
      options={options}
      value={value}
      onChangeValue={setValue}
    />
  );
}

const SAMPLE_DROPDOWN_OPTIONS: Record<string, DropdownOption> = {
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
