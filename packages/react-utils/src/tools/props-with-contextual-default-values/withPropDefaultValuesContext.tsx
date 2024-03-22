import { ReactNodePropWithPropDefaultValuesContext } from './types';

/**
 * A helper function to provide a ReactNodePropWithPropDefaultValuesContext with context.
 *
 * Example usage:
 *
 * ```tsx
 * const textProps: Partial<React.ComponentProps<typeof Text>> = {
 *   // ...
 * };
 *
 * return withPropDefaultValuesContext(children, {
 *   textProps: { value: textProps, context: TextPropsContext },
 * });
 * ```
 */
export function withPropDefaultValuesContext<C extends object>(
  node: ReactNodePropWithPropDefaultValuesContext<C>,
  contextData: {
    [K in keyof C]: {
      context:
        | React.Context<C[K]>
        | React.Context<C[K] | ((p: Partial<C[K]>) => C[K])>
        | null;
      value: C[K] | ((p: Partial<C[K]>) => C[K]);
    };
  },
): React.ReactNode {
  const contextValues = Object.fromEntries(
    Object.entries(contextData).map(([key, v]) => {
      const value = (v as (typeof contextData)[keyof typeof contextData]).value;
      return [key, value];
    }),
  ) as { [K in keyof C]: C[K] | ((p: Partial<C[K]>) => C[K]) };

  const props = Object.fromEntries(
    Object.entries(contextValues).map(([key, value]) => [
      key,
      typeof value === 'function' ? value({}) : value,
    ]),
  ) as C;

  // If the node is a function, call it with the context values to get the node.
  let currentNode = typeof node === 'function' ? node(props) : node;

  // Wrap the node with context providers.
  for (const [key, v] of Object.entries(contextData)) {
    const value = contextValues[key as keyof typeof contextData];
    const { context: Ctx } =
      v as (typeof contextData)[keyof typeof contextData];
    if (Ctx) {
      currentNode = <Ctx.Provider value={value}>{currentNode}</Ctx.Provider>;
    }
  }

  return currentNode;
}

export default withPropDefaultValuesContext;
