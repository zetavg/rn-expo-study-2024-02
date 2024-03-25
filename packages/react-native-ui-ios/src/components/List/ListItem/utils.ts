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
    if (!subtitle || compact) {
      return 44;
    } else {
      return 58;
    }
  })();

  return Math.floor(baseHeight * (uiScale > 1.2 ? 1.2 : uiScale));
}
