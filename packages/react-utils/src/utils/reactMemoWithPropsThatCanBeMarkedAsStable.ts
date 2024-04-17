import React, {
  ComponentType,
  FunctionComponent,
  MemoExoticComponent,
  NamedExoticComponent,
} from 'react';

import comparePropsWithPropsThatCanBeMarkedAsStable from './comparePropsWithPropsThatCanBeMarkedAsStable';

type PropsForIsStable<SP extends string> = {
  [prop in `${SP}IsStable`]?: boolean;
};

export function reactMemoWithPropsThatCanBeMarkedAsStable<
  P extends object,
  SP extends Exclude<keyof P, number | symbol>,
>(
  Component: FunctionComponent<P>,
  propsThatCanBeMarkedAsStable: ReadonlyArray<SP>,
): NamedExoticComponent<P & PropsForIsStable<SP>>;
export function reactMemoWithPropsThatCanBeMarkedAsStable<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any>,
  SP extends Exclude<keyof React.ComponentProps<T>, number | symbol>,
>(
  Component: T,
  propsThatCanBeMarkedAsStable: ReadonlyArray<SP>,
): MemoExoticComponent<
  T extends ComponentType<infer PP>
    ? ComponentType<PP & PropsForIsStable<SP>>
    : T
>;
export function reactMemoWithPropsThatCanBeMarkedAsStable(
  Component: FunctionComponent<unknown> | ComponentType<unknown>,
  propsThatCanBeMarkedAsStable: ReadonlyArray<string>,
) {
  return React.memo(
    Component,
    comparePropsWithPropsThatCanBeMarkedAsStable<string>(
      propsThatCanBeMarkedAsStable as ReadonlyArray<string>,
    ),
  );
}

export default reactMemoWithPropsThatCanBeMarkedAsStable;
