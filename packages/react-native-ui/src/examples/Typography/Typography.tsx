import React from 'react';
import { View } from 'react-native';

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
    </View>
  );
}

export default Typography;
