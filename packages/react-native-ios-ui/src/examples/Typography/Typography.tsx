import React from 'react';
import { View } from 'react-native';

import Text from '../../components/Text';
import { useTextStyles } from '../../contexts/TextStylesContext';

export function Typography() {
  const textStyles = useTextStyles();
  return (
    <View>
      <Text textStyle="largeTitle">
        Large Title - {textStyles.largeTitle.fontSize}/
        {textStyles.largeTitle.lineHeight}
      </Text>
      <Text textStyle="title1">
        Title 1 - {textStyles.title1.fontSize}/{textStyles.title1.lineHeight}
      </Text>
      <Text textStyle="title2">
        Title 2 - {textStyles.title2.fontSize}/{textStyles.title2.lineHeight}
      </Text>
      <Text textStyle="title3">
        Title 3 - {textStyles.title3.fontSize}/{textStyles.title3.lineHeight}
      </Text>
      <Text textStyle="headline">
        Headline - {textStyles.headline.fontSize}/
        {textStyles.headline.lineHeight}
      </Text>
      <Text textStyle="subheadline">
        Subheadline - {textStyles.subheadline.fontSize}/
        {textStyles.subheadline.lineHeight}
      </Text>
      <Text textStyle="body">
        Body - {textStyles.body.fontSize}/{textStyles.body.lineHeight}
      </Text>
      <Text textStyle="callout">
        Callout - {textStyles.callout.fontSize}/{textStyles.callout.lineHeight}
      </Text>
      <Text textStyle="caption1">
        Caption 1 - {textStyles.caption1.fontSize}/
        {textStyles.caption1.lineHeight}
      </Text>
      <Text textStyle="caption2">
        Caption 2 - {textStyles.caption2.fontSize}/
        {textStyles.caption2.lineHeight}
      </Text>
      <Text textStyle="footnote">
        Footnote - {textStyles.footnote.fontSize}/
        {textStyles.footnote.lineHeight}
      </Text>
    </View>
  );
}

export default Typography;
