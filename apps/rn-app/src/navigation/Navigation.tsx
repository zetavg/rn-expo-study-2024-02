import { NavigationContainer } from '@react-navigation/native';

import { BottomTabNavigation } from './BottomTabNavigation';
import { MainStackNavigation } from './MainStackNavigation';

/**
 * Navigation root. Use this component in the main app file to render the whole navigation tree.
 */
export default function Navigation() {
  return (
    <NavigationContainer>
      {/* <MainStackNavigation initialRouteName="Example1List" /> */}
      <BottomTabNavigation />
    </NavigationContainer>
  );
}
