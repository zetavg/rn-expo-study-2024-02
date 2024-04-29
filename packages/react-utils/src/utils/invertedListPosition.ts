export function invertedListPosition(
  listPosition: 'first' | 'middle' | 'last' | 'only',
) {
  if (listPosition === 'first') {
    return 'last';
  }

  if (listPosition === 'last') {
    return 'first';
  }

  return listPosition;
}

export default invertedListPosition;
