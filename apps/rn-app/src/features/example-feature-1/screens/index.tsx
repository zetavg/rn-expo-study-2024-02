import { MainStack } from '@/navigation/navigators';

import Example1DetailsScreen, {
  Params as Example1DetailsScreenParams,
} from './Example1DetailsScreen';
import Example1ListScreen, {
  Params as Example1ListScreenParams,
} from './Example1ListScreen';

// 1. Compose MainStackScreens by including Screens that should be part of MainStack
export const MainStackScreens = (
  <>
    <MainStack.Screen name="Example1List" component={Example1ListScreen} />
    <MainStack.Screen
      name="Example1Details"
      component={Example1DetailsScreen}
    />
  </>
);

// 2. Create MainStackParamList by combining Params from each Screen included in MainStackScreens
export type MainStackParamList = {
  Example1List: Example1ListScreenParams;
  Example1Details: Example1DetailsScreenParams;
};
