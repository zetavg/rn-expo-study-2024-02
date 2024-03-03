import { createContext } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export const BottomTabNavigationContext = createContext<
  BottomTabScreenProps<{ [name: string]: undefined }>['navigation'] | null
>(null);
