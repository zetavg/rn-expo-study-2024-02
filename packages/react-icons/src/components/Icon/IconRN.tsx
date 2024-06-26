import React, { forwardRef, useContext, useMemo } from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';
import SweetSFSymbol from 'sweet-sfsymbols';

import { usePropsWithContextualDefaultValues } from '@rnstudy/react-utils';

import { IconPlatformContext } from '../../contexts';
import IconThemeContext from '../../contexts/IconThemeContext';
import IconDefinitions from '../../IconDefinitions';
import { IconDefinition } from '../../types';

import { IconPropsContext } from './IconPropsContext';
import { IconProps } from './types';
import { getColorValue } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IconRN = forwardRef<any, IconProps>(function IconRN(
  props: IconProps,
  ref,
): JSX.Element | null {
  const {
    name,
    size = 32,
    color = 'default',
    bordered,
    label,
    image,
    // Style props
    m,
    mv,
    mh,
    mt,
    mb,
    ml,
    mr,
    align,
    opacity,
    backgroundColor,
    borderColor,
    borderWidth,
  } = usePropsWithContextualDefaultValues(props, IconPropsContext);

  const iconPlatform = useContext(IconPlatformContext);
  const iconTheme = useContext(IconThemeContext);

  if (!iconPlatform) {
    throw new Error(
      'Icon: No IconPlatformContext provided. Make sure to wrap your app in IconContextProvider and the platform prop is correctly set.',
    );
  }

  if (!iconTheme) {
    throw new Error(
      'Icon: No IconThemeContext provided. Make sure to wrap your app in IconContextProvider and the theme prop is correctly set.',
    );
  }

  const iconDefinition = IconDefinitions[name] as IconDefinition;

  const iconColor = (() => {
    const colorValue = getColorValue(color, iconTheme.colors);

    if (iconPlatform === 'ios' && !colorValue.startsWith('#')) {
      // SweetSFSymbol used on iOS only support color with hex value.
      return Color(colorValue).hexa();
    }

    return colorValue;
  })();

  let iconInset = bordered ? size / 5 : 0;

  const nativeIconElement = (() => {
    if (!iconDefinition) return null;

    if (image) {
      return (
        <Image
          source={{ width: size - 2, height: size - 2, ...image }}
          resizeMode="cover"
          style={{ borderRadius: iconTheme.borderRadius }}
        />
      );
    }

    if (iconDefinition.svg) {
      const SVGComponent = (() => {
        if (typeof iconDefinition.svg === 'function') {
          return iconDefinition.svg;
        }

        return iconDefinition.svg[iconPlatform];
      })();

      if (SVGComponent) {
        return (
          <SVGComponent
            width={size - iconInset}
            height={size - iconInset}
            color={iconColor}
          />
        );
      }
    }

    if (iconPlatform === 'ios') {
      const sfSymbolDefn = iconDefinition.sfSymbolDefinitions;

      if (sfSymbolDefn) {
        const osVersion =
          typeof Platform.Version === 'string'
            ? parseFloat(Platform.Version)
            : Platform.Version;
        for (const defn of sfSymbolDefn) {
          if (
            typeof defn.availability?.iOS === 'number' &&
            osVersion >= defn.availability.iOS
          ) {
            iconInset += size / 8;
            if (defn.additionalPaddingRatio) {
              iconInset += size * defn.additionalPaddingRatio;
            }

            const style = defn.adjustments
              ? Object.fromEntries(
                  Object.entries(defn.adjustments).map(([k, v]) => [
                    k,
                    typeof v === 'number' ? v * size : v,
                  ]),
                )
              : undefined;

            if (defn.opacityFix) {
              return (
                <SFSymbol
                  name={defn.name}
                  size={size - iconInset}
                  color={iconColor}
                  style={style}
                />
              );
            }

            return (
              <SweetSFSymbol
                name={defn.name}
                size={size - iconInset}
                renderingMode="monochrome"
                colors={[iconColor]}
                style={style}
              />
            );
          }
        }
      }
    }

    if (iconDefinition.materialIconConfig?.additionalPaddingRatio) {
      iconInset +=
        size * iconDefinition.materialIconConfig.additionalPaddingRatio;
    }

    const materialIconName =
      typeof iconDefinition.materialIconName === 'string'
        ? iconDefinition.materialIconName
        : iconDefinition.materialIconName[iconPlatform] ||
          iconDefinition.materialIconName.default;

    return (
      <MaterialIcon
        name={materialIconName}
        size={size - iconInset}
        color={iconColor}
        style={{ height: size - iconInset, width: size - iconInset }}
      />
    );
  })();

  const iconContainerStyle = useMemo<ViewStyle>(() => {
    const style: React.ComponentProps<typeof View>['style'] = {};

    if (m !== undefined) {
      style.marginVertical = m;
      style.marginHorizontal = m;
    }
    if (mv !== undefined) {
      style.marginVertical = mv;
    }
    if (mh !== undefined) {
      style.marginHorizontal = mh;
    }
    if (mt !== undefined) {
      style.marginTop = mt;
    }
    if (mb !== undefined) {
      style.marginBottom = mb;
    }
    if (ml !== undefined) {
      style.marginLeft = ml;
    }
    if (mr !== undefined) {
      style.marginRight = mr;
    }

    if (align !== undefined) {
      style.alignSelf = align === 'center' ? align : `flex-${align}`;
    }

    if (opacity !== undefined) {
      style.opacity = opacity;
    }

    if (bordered) {
      if (backgroundColor !== undefined) {
        style.backgroundColor = getColorValue(
          backgroundColor,
          iconTheme.colors,
        );
      }
      if (borderColor !== undefined) {
        style.borderColor = borderColor;
      }
      if (borderWidth !== undefined) {
        style.borderWidth = borderWidth;
      }
    }

    return style;
  }, [
    m,
    mb,
    mh,
    ml,
    mr,
    mt,
    mv,
    align,
    opacity,
    bordered,
    backgroundColor,
    borderColor,
    borderWidth,
    iconTheme.colors,
  ]);

  const iconElement = (
    <Animated.View
      ref={label ? undefined : ref}
      style={[
        styles.iconContainer,
        { width: size, height: size },
        bordered && {
          backgroundColor: image
            ? iconTheme.imageGrayBackgroundColor
            : iconTheme.grayBackgroundColor,
          borderRadius: iconTheme.borderRadius,
        },
        !label && iconContainerStyle,
      ]}
    >
      {nativeIconElement}
    </Animated.View>
  );

  if (label) {
    return (
      <Animated.View
        ref={ref}
        style={[
          styles.iconAndLabelContainer,
          { gap: size * (iconPlatform === 'ios' ? 1 / 8 : 1 / 12) },
          iconContainerStyle,
        ]}
      >
        {iconElement}
        <Text
          style={[
            styles.labelText,
            {
              color: iconColor,
              fontSize: size * (5 / 16),
              lineHeight: size * (3 / 8),
            },
          ]}
          allowFontScaling={false}
        >
          {label}
        </Text>
      </Animated.View>
    );
  }

  return iconElement;
});

export type IconRNType = typeof IconRN;

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAndLabelContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    textAlign: 'center',
  },
});

export default IconRN;
