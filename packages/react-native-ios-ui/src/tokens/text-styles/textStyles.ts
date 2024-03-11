import { StyleSheet } from 'react-native';

import { TextStyleTokens } from './types';

export const textStyles: TextStyleTokens = StyleSheet.create({
  largeTitle: {
    fontFamily: 'San Francisco',
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '400',
  },
  largeTitle_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
  },
  title1: {
    fontFamily: 'San Francisco',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '400',
  },
  title1_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  title2: {
    fontFamily: 'San Francisco',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
  },
  title2_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  title3: {
    fontFamily: 'San Francisco',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '400',
  },
  title3_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
  },
  headline: {
    fontFamily: 'San Francisco',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  body: {
    fontFamily: 'San Francisco',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
  },
  body_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  callout: {
    fontFamily: 'San Francisco',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
  },
  callout_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
  },
  subheadline: {
    fontFamily: 'San Francisco',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
  },
  subheadline_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  footnote: {
    fontFamily: 'San Francisco',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: -0.32,
  },
  footnote_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  caption1: {
    fontFamily: 'San Francisco',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  caption1_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  caption2: {
    fontFamily: 'San Francisco',
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400',
  },
  caption2_emphasized: {
    fontFamily: 'San Francisco',
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '600',
  },
});

export default textStyles;
