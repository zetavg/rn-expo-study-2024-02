import React from 'react';

import { StackScreenContent } from '../../screen-contents';
import { StackScreenProps } from '../../types';

export default function EmptyStackScreen({
  ..._
}: StackScreenProps<undefined>) {
  return <StackScreenContent title="Empty Screen">{null}</StackScreenContent>;
}
