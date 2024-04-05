import React from 'react';

import Button from '../../Button';

export const ACCESSORIES_EXAMPLES = {
  undefined,
  'Single Button': <Button label="Button" />,
  'Single Button With Icon': <Button label="Add" icon="_plus" />,
  'Multiple Buttons': (
    <>
      <Button buttonStyle="bordered" icon="_list_edit" />
      <Button buttonStyle="tinted" label="Add" icon="_plus" />
    </>
  ),
};
