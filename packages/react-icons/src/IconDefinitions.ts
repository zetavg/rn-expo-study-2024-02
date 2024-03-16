import { makeIconDefinition, makeIconDefinitions } from './types';

export const IconDefinitions = makeIconDefinitions({
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
  cat: makeIconDefinition({
    materialIconName: 'cat',
    sfSymbolDefinitions: [
      {
        name: 'cat.fill',
        availability: {
          iOS: 17,
          macOS: 14,
        },
        additionalPadding: 4,
      },
    ],
  }),
  android: makeIconDefinition({
    materialIconName: 'android',
  }),
});

export default IconDefinitions;
