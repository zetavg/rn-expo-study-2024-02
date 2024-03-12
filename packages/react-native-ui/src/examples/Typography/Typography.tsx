import React from 'react';
import { Text as RNText, View } from 'react-native';

import Text from '../../components/Text';

export function Typography() {
  return (
    <View>
      <Text>
        <Text largeTitle>Large Title</Text>{' '}
        <Text largeTitle emphasized>
          Emphasized
        </Text>
      </Text>
      <Text>
        <Text headline>Headline</Text>{' '}
        <Text headline emphasized>
          Emphasized
        </Text>
      </Text>
      <Text>
        <Text subheadline>Subheadline</Text>{' '}
        <Text subheadline emphasized>
          Emphasized
        </Text>
      </Text>
      <Text>
        <Text title1>Title 1</Text>{' '}
        <Text title1 emphasized>
          Emphasized
        </Text>
      </Text>
      <Text>
        <Text title2>Title 2</Text>{' '}
        <Text title2 emphasized>
          Emphasized
        </Text>
      </Text>
      <Text>
        <Text title3>Title 3</Text>{' '}
        <Text title3 emphasized>
          Emphasized
        </Text>
      </Text>
      <Text>
        <Text body>Body</Text>{' '}
        <Text body emphasized>
          emphasized
        </Text>
      </Text>
      <Text>
        <Text callout>Callout</Text>{' '}
        <Text callout emphasized>
          emphasized
        </Text>
      </Text>
      <Text>
        <Text footnote>Footnote</Text>{' '}
        <Text footnote emphasized>
          emphasized
        </Text>
      </Text>
      <Text>
        <Text caption1>Caption 1</Text>{' '}
        <Text caption1 emphasized>
          emphasized
        </Text>
      </Text>
      <Text>
        <Text caption2>Caption 2</Text>{' '}
        <Text caption2 emphasized>
          emphasized
        </Text>
      </Text>

      <Text> </Text>

      <Text>Default</Text>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ fontSize: 10, lineHeight: 12, fontStyle: 'italic' }}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        Custom style <Text style={{ fontSize: 5 }}>Custom style</Text>
      </Text>

      <Text> </Text>

      <Text>Default Color</Text>
      <Text secondary>Secondary Color</Text>
      <Text tertiary>Tertiary Color</Text>
      <Text quaternary>Quaternary Color</Text>
      <Text placeholder>Placeholder Color</Text>
    </View>
  );
}

export default Typography;
