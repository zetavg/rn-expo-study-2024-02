export const LAYOUT_ANIMATION_DURATION = 200;

export const EDIT_BUTTON_CONTAINER_WIDTH = 36;
export const CONTENT_CONTAINER_GAP = 4;
export const GRABBER_CONTAINER_WIDTH = 50;

// Hack: according to Figma spec, this should be `opaqueSeparator`, but seems that the opaqueSeparator color is not displayed correctly when used as a border color with hairline width in React Native, especially in dark mode with elevated background. With our experiments on some iOS devices, using the separator color (aka "Non-opaque separator color") will actually produce the correct color that matches the Figma spec.
export const SEPARATOR_COLOR_NAME = 'separator' as const;

export const MAIN_CONTENTS_CONTAINER_PADDING_END = 16;
export const CHILDREN_CONTAINER_PADDING_VERTICAL = 12;
