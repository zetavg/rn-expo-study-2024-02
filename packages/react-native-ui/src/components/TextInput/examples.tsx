import React from 'react';

import TextInput from './TextInput';

export function ExampleUncontrolledTextInput({
  value: valueProp,
  ...restProps
}: React.ComponentProps<typeof TextInput>) {
  const [value, setValue] = React.useState(valueProp);
  return <TextInput {...restProps} value={value} onValueChange={setValue} />;
}
