export function assignDefaults<T extends object, D extends Partial<T>>(
  values: T,
  defaultValues: D,
): T & D {
  for (const k in defaultValues) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((values as any)[k] === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (values as any)[k] = defaultValues[k];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return values as any;
}

export default assignDefaults;
