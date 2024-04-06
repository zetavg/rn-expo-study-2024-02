import React from 'react';

import Button from '../../Button';

export const ACCESSORIES_EXAMPLES = {
  undefined,
  'Single Button': <Button label="Button" onPress={() => {}} />,
  'Single Button with Icon': (
    <Button label="Add" icon="_plus" onPress={() => {}} />
  ),
  'Single Plain Button': (
    <Button plain label="Add" icon="_plus" onPress={() => {}} />
  ),
  'Single Plain Icon Button': (
    <Button plain icon="_ellipsis" onPress={() => {}} />
  ),
  'Multiple Buttons': (
    <>
      <Button buttonStyle="bordered" icon="_list_edit" onPress={() => {}} />
      <Button
        buttonStyle="tinted"
        label="Add"
        icon="_plus"
        onPress={() => {}}
      />
    </>
  ),
};
