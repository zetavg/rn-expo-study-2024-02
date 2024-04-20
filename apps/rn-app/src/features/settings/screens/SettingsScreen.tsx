import React from 'react';
import { Platform } from 'react-native';

import { useSettings } from '@/contexts/SettingsContext';
import {
  useMainStackNavigation,
  useModalStackNavigation,
} from '@/navigation/hooks';
import {
  StackScreenContent,
  StackScreenProps,
} from '@rnstudy/react-native-navigation';
import {
  AVAILABLE_UI_PLATFORMS,
  List,
  SegmentedControl,
} from '@rnstudy/react-native-ui';

export default function SettingsScreen({ ..._ }: StackScreenProps) {
  const mainStackNavigation = useMainStackNavigation();
  const modalStackNavigation = useModalStackNavigation();

  const settings = useSettings();

  return (
    <StackScreenContent title="Settings" headerLargeTitle>
      <StackScreenContent.ScrollView>
        <List
          first
          footerText={[
            Platform.OS === 'ios' &&
              'On iOS, setting a color scheme that is different from the system color scheme may cause some inconsistencies as some of the native components may still use the system color scheme.',
          ]
            .filter((t) => !!t)
            .join('\n\n')}
        >
          {AVAILABLE_UI_PLATFORMS.length > 1 && (
            <List.Item
              title="UI Platform"
              accessories={
                <SegmentedControl
                  options={
                    Object.fromEntries(
                      AVAILABLE_UI_PLATFORMS.map((platform) => [
                        platform,
                        (() => {
                          switch (platform) {
                            case 'ios':
                              return 'iOS';
                            case 'android':
                              return 'Android';
                            default:
                              return platform;
                          }
                        })(),
                      ]),
                    ) as {
                      [key in (typeof AVAILABLE_UI_PLATFORMS)[number]]: string;
                    }
                  }
                  value={settings?.uiPlatform}
                  onValueChange={settings?.setUIPlatform}
                />
              }
            />
          )}
          <List.Item
            title="Color Scheme"
            accessories={
              <SegmentedControl
                options={COLOR_SCHEME_OPTIONS}
                value={settings?.colorScheme}
                onValueChange={settings?.setColorScheme}
              />
            }
          />
        </List>
      </StackScreenContent.ScrollView>
    </StackScreenContent>
  );
}

const COLOR_SCHEME_OPTIONS = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
} as const;
