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
  cat: makeIconDefinition({
    materialIconName: 'cat',
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
  android: makeIconDefinition({
    materialIconName: 'android',
  }),
});

export default IconDefinitions;
