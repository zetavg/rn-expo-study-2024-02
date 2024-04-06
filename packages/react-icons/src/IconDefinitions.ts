import SampleSvgFileIcon from './svg/sample-svg-file-icon.svg';
import { makeIconDefinition, makeIconDefinitions } from './types';

export const IconDefinitions = makeIconDefinitions({
  'sample-svg-file-icon': makeIconDefinition({
    materialIconName: 'file-remove-outline',
    svg: SampleSvgFileIcon,
  }),
  heart: makeIconDefinition({
    materialIconName: 'heart',
    sfSymbolDefinitions: [
      {
        name: 'heart.fill',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  'heart.outline': makeIconDefinition({
    materialIconName: 'heart-outline',
    sfSymbolDefinitions: [
      {
        name: 'heart',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  star: makeIconDefinition({
    materialIconName: 'star',
    materialIconConfig: {
      additionalPaddingRatio: -0.1,
    },
    sfSymbolDefinitions: [
      {
        name: 'star.fill',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  'star.outline': makeIconDefinition({
    materialIconName: 'star-outline',
    materialIconConfig: {
      additionalPaddingRatio: -0.1,
    },
    sfSymbolDefinitions: [
      {
        name: 'star',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  person: makeIconDefinition({
    materialIconName: 'account',
    sfSymbolDefinitions: [
      {
        name: 'person.fill',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  'person.circle': makeIconDefinition({
    materialIconName: 'account-circle',
    sfSymbolDefinitions: [
      {
        name: 'person.crop.circle.fill',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  camera: makeIconDefinition({
    materialIconName: 'camera',
    sfSymbolDefinitions: [
      {
        name: 'camera.fill',
        availability: {
          iOS: 13,
          macOS: 11,
        },
        additionalPaddingRatio: 0.05,
      },
    ],
  }),
  airplane: makeIconDefinition({
    materialIconName: 'airplane',
    sfSymbolDefinitions: [
      {
        name: 'airplane',
        availability: {
          iOS: 13,
          macOS: 11,
        },
        additionalPaddingRatio: 0.05,
      },
    ],
  }),
  cat: makeIconDefinition({
    materialIconName: 'cat',
    materialIconConfig: {
      additionalPaddingRatio: -0.1,
    },
    sfSymbolDefinitions: [
      {
        name: 'cat.fill',
        availability: {
          iOS: 17,
          macOS: 14,
        },
        additionalPaddingRatio: 0.1,
      },
    ],
  }),
  dog: makeIconDefinition({
    materialIconName: 'dog',
    sfSymbolDefinitions: [
      {
        name: 'dog.fill',
        availability: {
          iOS: 17,
          macOS: 14,
        },
        additionalPaddingRatio: 0.1,
      },
    ],
  }),
  _edit: makeIconDefinition({
    materialIconName: 'pencil',
    sfSymbolDefinitions: [
      {
        name: 'pencil',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  '_edit.square': makeIconDefinition({
    materialIconName: 'square-edit-outline',
    sfSymbolDefinitions: [
      {
        name: 'square.and.pencil',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  _plus: makeIconDefinition({
    materialIconName: 'plus',
    sfSymbolDefinitions: [
      {
        name: 'plus',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  _list_edit: makeIconDefinition({
    materialIconName: 'playlist-edit',
    sfSymbolDefinitions: [
      {
        name: 'list.bullet.indent',
        availability: {
          iOS: 13,
          macOS: 11,
        },
        additionalPaddingRatio: 0.1,
      },
    ],
  }),
  _info: makeIconDefinition({
    materialIconName: 'information',
    sfSymbolDefinitions: [
      {
        name: 'info.circle',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  _more: makeIconDefinition({
    materialIconName: 'dots-horizontal-circle-outline',
    sfSymbolDefinitions: [
      {
        name: 'ellipsis.circle',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  _ellipsis: makeIconDefinition({
    materialIconName: 'dots-horizontal',
    sfSymbolDefinitions: [
      {
        name: 'ellipsis',
        availability: {
          iOS: 13,
          macOS: 11,
        },
        opacityFix: true,
      },
    ],
  }),
  _play: makeIconDefinition({
    materialIconName: 'play',
    materialIconConfig: {
      additionalPaddingRatio: -0.2,
    },
    sfSymbolDefinitions: [
      {
        name: 'play.fill',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  _listitem_person: makeIconDefinition({
    materialIconName: {
      default: 'account-outline',
      ios: 'account',
    },
    sfSymbolDefinitions: [
      {
        name: 'person.fill',
        availability: {
          iOS: 13,
          macOS: 11,
        },
      },
    ],
  }),
  android: makeIconDefinition({
    materialIconName: 'android',
  }),
});

export default IconDefinitions;
