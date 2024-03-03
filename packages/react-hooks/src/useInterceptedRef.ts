import React, { useMemo, useRef } from 'react';

/**
 * * The first value is the ref that should be passed to a component.
 * * The second value is the ref object that can be used internally.
 */
type ReturnType<T> = Readonly<
  [NonNullable<React.ForwardedRef<T>>, React.RefObject<T>]
>;

/**
 * A hook to intercept a ref passed by `forwardRef`.
 *
 * This will ensure that there is a usable ref even if the parent component does not pass a ref, or passes a function as the ref.
 */
export function useInterceptedRef<T>(
  forwardedRef: React.ForwardedRef<T>,
): ReturnType<T> {
  const localRefObject = useRef<T | null>(null);

  return useMemo<ReturnType<T>>(() => {
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        const ref = (value: T | null) => {
          localRefObject.current = value;
          forwardedRef(value);
        };

        return [ref, localRefObject] as const;
      }

      return [forwardedRef, forwardedRef] as const;
    }

    return [localRefObject, localRefObject] as const;
  }, []);
}
