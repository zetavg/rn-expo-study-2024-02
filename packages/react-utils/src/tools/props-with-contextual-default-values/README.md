# props-with-contextual-default-values

## Introduction

As an example, we have a component library that has a `Text` component:

```jsx
<Text>Hello world!</Text>
```

The `Text` component has a `color` prop that can be used to change the color of the text. The `Text` component has a default color of `black`.


However, we want to be able to change the default color of the `Text` component based on the context of the application. For example, if the `Text` component is used in a `Card` component, we want the default color of the `Text` component to be `blue`.

```jsx
<Text>Hello world!</Text> {/* Should be black */}

<Card>
  {/* Should be blue */}
  <Text>I'm in a card!</Text>

  {/* Should be black */}
  <Text color="black">I'm explicitly set to black!</Text>
</Card>
```

Furthermore, sometimes, we want to access the default props of the `Text` component in the `Card` component to render the content conditionally.

```jsx
<Card>
  {({ textProps }) => (
    // "Hello, I am blue with size x!" with a blue color (dynamically based on what the Card component provides)
    <Text {...textProps}>Hello, I am {textProps.color} with size {textProps.fontSize}!</Text>
    <Icon size={textProps.fontSize} />
  )}
</Card>
```

This package provides a set of tools to help you achieve this.


## Usage

Continuing the example above, assume that your `Text` component is originally defined as follows:

```tsx
type Props = {
  color?: 'black' | 'blue' | 'red';
  // ...
}

export function Text({ color = 'black' }: Props) {
  // return ...;
}
```

First, you need to define a context for providing the contextual default props of the `Text` component:

```tsx
export const TextPropsContext = createContext<Partial<Props>>({});
TextPropsContext.displayName = 'TextPropsContext';
```

Then, modify your `Text` component to use the `useContextualDefaultProps` hook:

```tsx
export function Text(props: Props) {
  const {
    color = 'black',
    // ...
  } = usePropsWithContextualDefaultValues(props, TextPropsContext);

  // return ...;
}
```

Finally, in your `Card` component, define the type of the `children` prop with the `ReactNodePropWithPropDefaultValuesContext` type and use the `withPropDefaultValuesContext` function to wrap the children with context providers:

```tsx
// ...

import {
  type ReactNodePropWithPropDefaultValuesContext,
  withPropDefaultValuesContext,
} from '...';

import { TextPropsContext } from './Text';

function Card({
  // ...
  children,
}: {
  // ...
  children: ReactNodePropWithPropDefaultValuesContext<{
    textProps: Partial<React.ComponentProps<typeof Text>>;
  }>;
}) {
  // ...

  // Define the default props of the Text component in the context of the Card component.
  const textProps: Partial<React.ComponentProps<typeof Text>> = {
    color: 'blue',
  };

  // Wrap the children with context providers.
  const wrappedChildren = withPropDefaultValuesContext(children, {
    textProps: { value: textProps, context: TextPropsContext },
  });

  // ...

  return <...>{wrappedChildren}</...>
}
```

### Let children inherit default props from other parent components

Note that if you want to let the default props of the `Text` component in the `Card` component inherit values provided by other parent components, for example, for this to work:

```tsx
<LargeText> {/* Makes the chlidren Text large. */}
  <Card> {/* Makes the chlidren Text blue. */}
    <Text>I am blue and large!</Text>
  </Card>
</LargeText>
```

You should use the `useContext` hook to get those values and merge them with the default props of the `Text` component manually:

```tsx
  // ...

  const textProps: Partial<React.ComponentProps<typeof Text>> = {
    ...useContext(TextPropsContext), // Add this
    color: 'blue',
  };

  // ...
```

### Create new components with different default props

Sometimes, you may want the same component to have different default props based on their types. This can be achieved by using the `withDefaultProps` function to create new components with different default props.

```tsx
import { withDefaultProps} from '...';

Card.TitleText = withDefaultProps(Text, { color: 'red' });
```

```tsx
<Card>
  <Card.TitleText>I'm red!</Card.TitleText>
  <Text>I'm blue!</Text>
<Card>
```

With this approach, the value of a specific prop will be determined in the following order of precedence:

1. The value explicitly set by the parent component (`<Text color="...">{/* ... */}</Text>`).
2. The value provided with the `withDefaultProps` function.
3. The value provided by the parent component with the `withPropDefaultValuesContext` function.
