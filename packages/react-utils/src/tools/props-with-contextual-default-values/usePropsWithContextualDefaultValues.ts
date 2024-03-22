import React from 'react';

export function usePropsWithContextualDefaultValues<T extends object>(
  props: T,
  context:
    | React.Context<Partial<T>>
    | React.Context<Partial<T> | ((props: Partial<T>) => Partial<T>)>,
): T {
  const contextValue = React.useContext(
    context as React.Context<Partial<T> | ((props: Partial<T>) => Partial<T>)>,
  );
  const propsFromContext =
    typeof contextValue === 'function' ? contextValue(props) : contextValue;

  return {
    ...props,
    ...Object.fromEntries(
      Object.entries(propsFromContext).filter(
        ([name]) => props[name as keyof typeof contextValue] === undefined,
      ),
    ),
  };
}

export default usePropsWithContextualDefaultValues;
