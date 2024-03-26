// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function collectPropsFromArgs<T extends Record<string, any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: Record<string, any>,
  prefix: string,
): Partial<T> {
  const props: Partial<T> = {};

  for (const key in args) {
    if (key.startsWith(prefix)) {
      const propName = key.slice(prefix.length);
      const value = args[key as keyof typeof args];

      if (propName && value !== '') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (props as any)[propName] = args[key as keyof typeof args];
      }
    }
  }

  return props;
}

export default collectPropsFromArgs;
