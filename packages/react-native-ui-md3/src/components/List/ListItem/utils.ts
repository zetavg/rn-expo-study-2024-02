export function getListItemHeight({
  subtitle,
  compact,
  fontScale,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subtitle?: React.ReactNode | ((...args: any) => void) | boolean;
  compact?: boolean;
  fontScale: number;
}): number {
  const uiScale = fontScale > 1 ? fontScale : 1;

  const baseHeight = (() => {
    if (compact) {
      return 56;
    } else if (!subtitle) {
      return 56;
    } else {
      return 72;
    }
  })();

  return Math.floor(baseHeight * (uiScale > 1.2 ? 1.2 : uiScale));
}
