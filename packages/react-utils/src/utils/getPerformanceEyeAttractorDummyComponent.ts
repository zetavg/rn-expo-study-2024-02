import { useRef } from 'react';

/** Be sure to render this only in dev mode! */
type PerformanceEyeAttractorDummyComponent = (() => null) & {
  displayName: string;
};

/**
 * Sometimes, the heavy work of a component is done in `useEffect` or `useLayoutEffect` and will be delayed to the next frame (react commit) and be shown separately in the Profiler of react-devtools.
 * In this case, the impact of re-rendering such a component might not gain enough attention in the Profiler, or making it hard to find out why subsequent re-renders (react commits) are happening.
 *
 * To help with this, use this function to create a dummy component and render it in such components under development mode to gain attention in the Profiler.
 *
 * Be sure to render the dummy component only in dev mode! For example, in React Native:
 *
 * ```tsx
 * {__DEV__ && <PerformanceEyeAttractorDummyComponent />}
 * ```
 */
export function getPerformanceEyeAttractorDummyComponent({
  impact = 1,
  message,
}: {
  /** The impact of re-rendering the component. The higher the number, the heavier the work will be done in the dummy component - and the more attention it will gain in the Profiler. Defaults to `1`. */
  impact: number;
  /** A message to describe the impact of re-rendering the component. Will be shown in the display name of the dummy component. */
  message: string;
}): PerformanceEyeAttractorDummyComponent {
  const performanceEyeAttractorDummyComponent: PerformanceEyeAttractorDummyComponent =
    () => {
      const firstRender = useRef(true);
      if (!firstRender.current) {
        for (let i = 0; i < 100_000 * impact * impact; i++) {
          // Do nothing
        }
      }
      firstRender.current = false;

      return null;
    };

  performanceEyeAttractorDummyComponent.displayName = `PerfEyeAttractorDummyComponent: ${message}`;

  return performanceEyeAttractorDummyComponent;
}
