// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectMap<T extends Record<string, any>, T2>(
  obj: T,
  fn: (value: T[keyof T], key: string) => T2,
): { [K in keyof T]: T2 } {
  const keys = Object.keys(obj) as Array<keyof T>;
  const mappedObj: Partial<{ [K in keyof T]: T2 }> = {};

  for (const key of keys) {
    mappedObj[key] = fn(obj[key], key as string);
  }

  return mappedObj as { [K in keyof T]: T2 };
}

export default objectMap;
