export function calculateListPosition(
  index: number,
  dataLength: number,
): 'first' | 'middle' | 'last' | 'only' {
  if (dataLength === 1) {
    return 'only';
  }

  if (index === 0) {
    return 'first';
  }

  if (index === dataLength - 1) {
    return 'last';
  }

  return 'middle';
}

export default calculateListPosition;
