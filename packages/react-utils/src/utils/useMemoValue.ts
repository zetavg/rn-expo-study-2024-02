import { useRef } from 'react';

import shallowEqual from './shallowEqual';

export type Comparator<T> = (a: T, b: T) => boolean;

const FIRST_RUN = Symbol('FIRST_RUN');

/**
 * Reuse the previous version of a value unless it has changed.
 *
 * @param value The current value.
 * @param comparator An function to compare the current value to its previous value, defaults to shallowEqual.
 */
export function useMemoValue<T>(
  value: T,
  comparator: Comparator<T> = shallowEqual,
): T {
  const ref = useRef<T | typeof FIRST_RUN>(FIRST_RUN);

  if (ref.current === FIRST_RUN || !comparator(value, ref.current)) {
    ref.current = value;
    return ref.current;
  }

  return ref.current;
}

export default useMemoValue;
