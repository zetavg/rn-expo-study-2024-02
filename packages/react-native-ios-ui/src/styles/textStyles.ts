import { StyleSheet } from 'react-native';

export const textStyles = StyleSheet.create({
  largeTitle: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 34,
    // letterSpacing: -0.4000000059604645,
  },
  'largeTitle.emphasized': {
    fontWeight: '700',
  },
  title1: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 28,
    // letterSpacing: -0.4000000059604645,
  },
  'title1.emphasized': {
    fontWeight: '700',
  },
  title2: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 22,
    // letterSpacing: -0.4000000059604645,
  },
  'title2.emphasized': {
    fontWeight: '700',
  },
  title3: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 20,
    // letterSpacing: -0.4000000059604645,
  },
  'title3.emphasized': {
    fontWeight: '700',
  },
  headline: {
    fontFamily: 'SF Pro',
    fontWeight: '600',
    fontSize: 17,
    // letterSpacing: -0.4000000059604645,
  },
  body: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 17,
    letterSpacing: 0,
  },
  'body.emphasized': {
    fontWeight: '600',
  },
  callout: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 16,
    // letterSpacing: -0.4000000059604645,
  },
  'callout.emphasized': {
    fontWeight: '600',
  },
  subheadline: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 15,
    // letterSpacing: -0.4000000059604645,
  },
  'subheadline.emphasized': {
    fontWeight: '600',
  },
  footnote: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 13,
    letterSpacing: -0.32,
  },
  'footnote.emphasized': {
    fontWeight: '600',
  },
  caption1: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 12,
    // letterSpacing: -0.4000000059604645,
  },
  'caption1.emphasized': {
    fontWeight: '500',
  },
  caption2: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 11,
    // letterSpacing: -0.4000000059604645,
  },
  'caption2.emphasized': {
    fontWeight: '600',
  },
});

export default textStyles;

// function convertIosTextStyleFromFigma(textStyle) {
//   return {
//     fontFamily: textStyle.fontFamily,
//     fontWeight: '400',
//     fontSize: textStyle.fontSize,
//     letterSpacing: textStyle.letterSpacing.value,
//   };
// }

// /*
// Value	Common weight name
// 100	Thin (Hairline)
// 200	Extra Light (Ultra Light)
// 300	Light
// 400	Normal (Regular)
// 500	Medium
// 600	Semi Bold (Demi Bold)
// 700	Bold
// 800	Extra Bold (Ultra Bold)
// 900	Black (Heavy)
// 950	Extra Black (Ultra Black)
// */
// function convertFontWeight(fontWeight) {
//   switch (fontWeight) {
//     case 'Thin':
//       return '100';
//     case 'Extra Light':
//       return '200';
//   }
// }
