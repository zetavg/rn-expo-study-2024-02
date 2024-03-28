import React from 'react';

import Switch from './Switch';

export function ExampleUncontrolledSwitch({
  value: valueProp,
  ...restProps
}: React.ComponentProps<typeof Switch>) {
  const [value, setValue] = React.useState(valueProp);
  return <Switch {...restProps} value={value} onValueChange={setValue} />;
}
