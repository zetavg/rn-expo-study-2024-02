import React from 'react';
import { View } from 'react-native';

import Text from '../../components/Text';
import { useTextStyles } from '../../contexts/TextStylesContext';

export function Typography() {
  const textStyles = useTextStyles();
  return (
    <View>
      <Text>
        <Text textStyle="largeTitle">
          Large Title{' '}
          <Text textStyle="largeTitle" emphasized>
            Emphasized
          </Text>{' '}
          - {textStyles.largeTitle.fontSize}/{textStyles.largeTitle.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="headline">
          Headline{' '}
          <Text textStyle="headline" emphasized>
            Emphasized
          </Text>{' '}
          - {textStyles.headline.fontSize}/{textStyles.headline.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="subheadline">
          Subheadline{' '}
          <Text textStyle="subheadline" emphasized>
            Emphasized
          </Text>{' '}
          - {textStyles.subheadline.fontSize}/
          {textStyles.subheadline.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="title1">
          Title 1{' '}
          <Text textStyle="title1" emphasized>
            Emphasized
          </Text>{' '}
          - {textStyles.title1.fontSize}/{textStyles.title1.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="title2">
          Title 2{' '}
          <Text textStyle="title2" emphasized>
            Emphasized
          </Text>{' '}
          - {textStyles.title2.fontSize}/{textStyles.title2.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="title3">
          Title 3{' '}
          <Text textStyle="title3" emphasized>
            Emphasized
          </Text>{' '}
          - {textStyles.title3.fontSize}/{textStyles.title3.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="body">
          Body{' '}
          <Text textStyle="body" emphasized>
            emphasized
          </Text>{' '}
          - {textStyles.body.fontSize}/{textStyles.body.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="callout">
          Callout{' '}
          <Text textStyle="callout" emphasized>
            emphasized
          </Text>{' '}
          - {textStyles.callout.fontSize}/{textStyles.callout.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="caption1">
          Caption 1{' '}
          <Text textStyle="caption1" emphasized>
            emphasized
          </Text>{' '}
          - {textStyles.caption1.fontSize}/{textStyles.caption1.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="caption2">
          Caption 2{' '}
          <Text textStyle="caption2" emphasized>
            emphasized
          </Text>{' '}
          - {textStyles.caption2.fontSize}/{textStyles.caption2.lineHeight}
        </Text>
      </Text>
      <Text>
        <Text textStyle="footnote">
          Footnote{' '}
          <Text textStyle="footnote" emphasized>
            emphasized
          </Text>{' '}
          - {textStyles.footnote.fontSize}/{textStyles.footnote.lineHeight}
        </Text>
      </Text>
      <Text> </Text>
      <Text>Default</Text>
      <Text color="secondary">Secondary</Text>
      <Text color="tertiary">Tertiary</Text>
      <Text color="quaternary">Quaternary</Text>
      <Text color="placeholder">Placeholder</Text>
    </View>
  );
}

export default Typography;
