import React from 'react';

export function usePropsWithContextualDefaultValues<T extends object>(
  props: T,
  context: React.Context<Partial<T>>,
): T {
  const contextValue = React.useContext(context);

  return {
    ...props,
    ...Object.fromEntries(
      Object.entries(contextValue).filter(
        ([name]) => props[name as keyof typeof contextValue] === undefined,
      ),
    ),
  };
}

export default usePropsWithContextualDefaultValues;
