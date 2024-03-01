/**
 * Navigators
 *
 * This file is used to define the navigators used in the app.
 *
 * Instead of defining navigators inside every navigation file, circular dependencies can be avoided by defining them here.
 *
 * Here is an diagram to illustrate the relationship between navigators and screens, as "A → B" means "A is imported by B":
 *
 *   navigation/navigators → features/.../screens
 *     │                       ↓
 *     ╰─→ navigation/*Navigation
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { MainStackParamList } from './MainStackNavigation';
export const MainStack = createNativeStackNavigator<MainStackParamList>();

export const BottomTab = createBottomTabNavigator();
