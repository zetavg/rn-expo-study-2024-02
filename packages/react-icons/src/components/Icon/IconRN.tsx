import React, { useContext, useMemo } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
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

export function IconRN(props: IconProps): JSX.Element | null {
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
    const colorValue = (() => {
      if (color in iconTheme.colors) {
        return iconTheme.colors[color as keyof typeof iconTheme.colors];
      }

      return color;
    })();

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
            return (
              <SweetSFSymbol
                name={defn.name}
                size={size - iconInset}
                renderingMode="monochrome"
                colors={[iconColor]}
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

    return (
      <MaterialIcon
        name={iconDefinition.materialIconName}
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

    if (opacity !== undefined) {
      style.opacity = opacity;
    }

    if (bordered) {
      if (backgroundColor !== undefined) {
        style.backgroundColor = backgroundColor;
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
    opacity,
    bordered,
    backgroundColor,
    borderColor,
    borderWidth,
  ]);

  const iconElement = (
    <View
      style={[
        styles.iconContainer,
        { width: size, height: size },
        bordered && {
          backgroundColor: iconTheme.grayBackgroundColor,
          borderRadius: iconTheme.borderRadius,
        },
        iconContainerStyle,
      ]}
    >
      {nativeIconElement}
    </View>
  );

  if (label) {
    return (
      <View
        style={[
          styles.iconAndLabelContainer,
          { gap: size * (iconPlatform === 'ios' ? 1 / 8 : 1 / 12) },
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
      </View>
    );
  }

  return iconElement;
}

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
