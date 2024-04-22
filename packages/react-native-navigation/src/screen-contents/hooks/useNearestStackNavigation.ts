import { useContext, useMemo } from 'react';
import { NavigationContext, ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

type StackNavigation = StackScreenProps<ParamListBase>['navigation'];

export function useNearestStackNavigation(): StackNavigation | null {
  const navigation = useContext(NavigationContext);

  return useMemo<StackNavigation | null>(() => {
    let currentNavigation = navigation;

    while (currentNavigation) {
      if (
        !currentNavigation
          .getId()
          ?.startsWith('modal-screen-content-navigator') &&
        currentNavigation.getState().type === 'stack'
      ) {
        return currentNavigation as StackNavigation;
      }

      currentNavigation = currentNavigation.getParent();
    }

    return null;
  }, [navigation]);
}
