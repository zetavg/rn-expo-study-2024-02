import React from 'react';
import { renderHook } from '@testing-library/react';

import { useInterceptedRef } from './useInterceptedRef';

describe('useInterceptedRef', () => {
  it('should return a tuple with a ForwardedRef and a RefObject', () => {
    const { result } = renderHook(() => useInterceptedRef(null));
    expect(result.current).toHaveLength(2);
    const [ref, refObject] = result.current;
    expect(typeof ref).toBe('object');
    expect(ref).toHaveProperty('current');
    expect(refObject).toHaveProperty('current');
  });

  it('should handle null as forwardedRef', () => {
    const { result } = renderHook(() => useInterceptedRef(null));
    expect(result.current).toHaveLength(2);
    const [ref, refObject] = result.current;
    expect(typeof ref).toBe('object');

    // Simulate passing the ref to a component and the component has updated the ref value
    typeof ref === 'object' && (ref.current = 'test-value');

    // The refObject should be updated
    expect(refObject.current).toBe('test-value');
  });

  it('should handle a function as forwardedRef', () => {
    const refFunction = jest.fn();
    const { result } = renderHook(() => useInterceptedRef(refFunction));
    expect(result.current).toHaveLength(2);
    const [ref, refObject] = result.current;
    expect(typeof ref).toBe('function');

    // Simulate passing the ref to a component and the component has called the ref function
    typeof ref === 'function' && ref('test-value');

    // The ref should be forwarded as the forwardedRef function is called with the value
    expect(refFunction).toHaveBeenCalledWith('test-value');

    // The refObject should be updated
    expect(refObject.current).toBe('test-value');
  });

  it('should handle a ref object as forwardedRef', () => {
    const forwardedRef = React.createRef<string>();
    expect(forwardedRef.current).toBe(null);

    const { result } = renderHook(() => useInterceptedRef(forwardedRef));
    expect(result.current).toHaveLength(2);
    const [ref, refObject] = result.current;
    expect(typeof ref).toBe('object');

    // Simulate passing the ref to a component and the component has called the ref function
    typeof ref === 'object' && (ref.current = 'test-value');

    // The ref should be forwarded as the current value of the forwardedRef object is updated
    expect(forwardedRef.current).toBe('test-value');

    // The refObject should be updated
    expect(refObject.current).toBe('test-value');
  });
});
