/**
 * A ReactNode, or a renderer function that receives the props context C and returns a ReactNode.
 */
export type ReactNodePropWithPropDefaultValuesContext<C extends object> =
  | React.ReactNode
  | ((contextValues: C) => React.ReactNode);
