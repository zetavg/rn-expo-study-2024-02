declare module '*.svg' {
  type NumberProp = string | number;
  const content: (props: {
    width?: NumberProp;
    height?: NumberProp;
    viewBox?: string;
    preserveAspectRatio?: string;
    color?: string | (symbol & { __TYPE__: 'Color' });
    title?: string;
  }) => JSX.Element;
  export default content;
}
