import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

/**
 * When running on desktop, resizing the window will trigger a lot of  .... .... ....
 */
export function useDebouncedWindowDimensions(t: number = 500): ScaledSize {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));
  const dimensionsRef = useRef(dimensions);
  dimensionsRef.current = dimensions;

  const setDimensionsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    function handleChange({ window }: { window: ScaledSize }) {
      if (setDimensionsTimerRef.current) {
        clearTimeout(setDimensionsTimerRef.current);
      }

      setDimensionsTimerRef.current = setTimeout(() => {
        if (
          dimensionsRef.current.width !== window.width ||
          dimensionsRef.current.height !== window.height ||
          dimensionsRef.current.scale !== window.scale ||
          dimensionsRef.current.fontScale !== window.fontScale
        ) {
          setDimensions(window);
        }
      }, t);
    }

    const subscription = Dimensions.addEventListener('change', handleChange);

    // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.
    handleChange({ window: Dimensions.get('window') });

    return () => {
      subscription.remove();
    };
  }, [t]);

  return dimensions;
}

export default useDebouncedWindowDimensions;
