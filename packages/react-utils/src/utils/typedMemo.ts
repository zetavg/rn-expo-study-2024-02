import React, { FunctionComponent } from 'react';

/**
 * `React.memo` that will not lost the generic props type of the component.
 *
 * See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
 */
export const typedMemo: <T>(
  c: T,
  arePropsEqual?: (
    prevProps: T extends FunctionComponent<infer P> ? P : never,
    nextProps: T extends FunctionComponent<infer P> ? P : never,
  ) => boolean,
) => T & { displayName?: string } = React.memo;

export default typedMemo;
