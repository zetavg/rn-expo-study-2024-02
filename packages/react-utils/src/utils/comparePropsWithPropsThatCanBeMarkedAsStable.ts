import shallowEqual from './shallowEqual';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props<PropName extends string> = { [p in PropName]: any } & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [q in `${PropName}IsStable`]: any;
};

type CompareFn<PropName extends string> = (
  prevProps: Readonly<Props<PropName>>,
  nextProps: Readonly<Props<PropName>>,
) => boolean;

/**
 * Generates a `arePropsEqual` function for `React.memo` that compares props, but ignoring props that have a corresponding `...IsStable` prop set to `true`.
 *
 * For example, for a component with an `onPress` prop:
 *
 * ```tsx
 * const MyMemoButton = React.memo(Button, comparePropsWithPropsThatCanBeMarkedAsStable(['onPress']));
 * ```
 *
 * You can then use the `onPressIsStable` prop to mark the `onPress` prop as stable and ignore it when comparing props for re-renders:
 *
 * ```tsx
 * <MyMemoButton onPressIsStable onPress={() => Alert.alert('Pressed')} />
 * ```
 *
 * See: https://bit.ly/propNameIsStable
 *
 * @param propsThatCanBeMarkedAsStable An array of prop names that can be marked as stable by setting an `...IsStable` prop to `true`.
 * @returns A function that can be used as the `arePropsEqual` function of `React.memo`.
 */
export function comparePropsWithPropsThatCanBeMarkedAsStable<
  PropName extends string,
>(propsThatCanBeMarkedAsStable: ReadonlyArray<PropName>): CompareFn<PropName> {
  const compare: CompareFn<PropName> = (prevProps, nextProps) => {
    const prevPropToCompare = { ...prevProps };
    const nextPropsToCompare = { ...nextProps };

    for (const prop of propsThatCanBeMarkedAsStable) {
      if (
        prevProps[`${prop}IsStable`] === true &&
        nextProps[`${prop}IsStable`] === true
      ) {
        delete prevPropToCompare[prop];
        delete nextPropsToCompare[prop];
      }
    }

    return shallowEqual(prevPropToCompare, nextPropsToCompare);
  };

  return compare;
}
export default comparePropsWithPropsThatCanBeMarkedAsStable;
