import shallowEqual from './shallowEqual';

/**
 * Props for components that have an `onValueChange` function that is can be dependency-free. Should be used in components wrapped with `React.memo` with the `arePropsWithOnValueChangeFunctionEqual` function.
 */
export type OnValueChangeIsDependencyFreeProps = {
  /**
   * Setting this to `true` means that the `onValueChange` function of the component should be treated as a dependency-free function - i.e. it only references values that will not change between renders (such as refs and setState functions), and shall be safe to pass into the `useCallback` hook without any specifying any dependencies.
   *
   * This is a performance optimization to prevent unnecessary re-renders of the component, **and should only be used when the `onValueChange` function is guaranteed to be dependency-free**.
   *
   * Use case:
   *
   * To prevent unnecessary re-renders of components that use the `onValueChange` prop, we will wrap the `onValueChange` function with `useCallback`. In many cases, the `onValueChange` function does not depend on any props or state, and can be safely wrapped with `useCallback` without any dependencies, such as:
   *
   * ```tsx
   * <MySwitch
   *   value={state.myValue}
   *   onValueChange={useCallback(
   *     (myValue: boolean) =>
   *       setState((s) => ({
   *         ...s,
   *         myValue,
   *       })),
   *     [],
   *   )}
   * />
   * ```
   *
   * However, this has some drawbacks:
   *
   *  1. The code is longer and less convenient to write.
   *  2. TypeScript will not be able to infer the parameter type of the `onValueChange` function, and you will need to specify the type manually.
   *  3. If the component is rendered conditionally, you will not be able to use the `useCallback` hook inside the JSX expression, and will need to move the function definition of the `onValueChange` handler function to the top of the component (such as `const handleMyValueChange = useCallback(...)`). Sometimes, this can make the code harder to read and maintain since the `handleMyValueChange` function is not close to where it is used.
   *
   * By using the `onValueChangeIsDependencyFree` prop, you can avoid these drawbacks of using `useCallback` to wrap the `onValueChange` function without dependencies to prevent unnecessary re-renders of the component, as the component will simply ignore the `onValueChange` prop when comparing props for re-renders:
   *
   * ```tsx
   * <MySwitch
   *   value={state.myValue}
   *   onValueChangeIsDependencyFree
   *   onValueChange={(myValue) =>
   *     setState((s) => ({
   *       ...s,
   *       myValue,
   *     }))
   *   }
   * />
   * ```
   */
  onValueChangeIsDependencyFree?: boolean;
};

type PropsWithOnValueChangeFunction = Readonly<
  OnValueChangeIsDependencyFreeProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onValueChange?: (...args: any) => any;
  } & { [key: string]: unknown }
>;

/**
 * A function that can be used as the `arePropsEqual` function of `React.memo` to support using the `onValueChangeIsDependencyFree` prop to ignore the `onValueChange` prop when comparing props for re-renders.
 */
export function arePropsWithOnValueChangeFunctionEqual(
  prevProps: PropsWithOnValueChangeFunction,
  nextProps: PropsWithOnValueChangeFunction,
) {
  if (
    prevProps.onValueChangeIsDependencyFree &&
    nextProps.onValueChangeIsDependencyFree
  ) {
    const { onValueChange: _, ...restPrevProps } = prevProps;
    const { onValueChange: __, ...restNextProps } = nextProps;
    return shallowEqual(restPrevProps, restNextProps);
  }

  return shallowEqual(prevProps, nextProps);
}

export default arePropsWithOnValueChangeFunctionEqual;
