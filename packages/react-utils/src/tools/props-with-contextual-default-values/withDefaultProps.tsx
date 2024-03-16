import React from 'react';

/**
 * Wraps a component with new default props.
 */
export function withDefaultProps<P extends object, C>(
  component: C,
  defaultProps: Partial<P>,
): C {
  const WithDefaultProps = React.forwardRef((props: P, ref) => {
    const propsWithNewDefaults = { ...props };

    for (const [k, value] of Object.entries(defaultProps)) {
      const key = k as keyof typeof defaultProps;
      if (propsWithNewDefaults[key] === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        propsWithNewDefaults[key] = value as any;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = component as any;

    return <Component ref={ref} {...propsWithNewDefaults} />;
  });

  WithDefaultProps.displayName = 'WithDefaultProps';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return WithDefaultProps as any;
}

export default withDefaultProps;
