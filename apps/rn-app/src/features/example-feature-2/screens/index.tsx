import { MainStack } from '@/navigation/navigators';

import Example2DetailsScreen, {
  Params as Example2DetailsScreenParams,
} from './Example2DetailsScreen';
import Example2ListScreen, {
  Params as Example2ListScreenParams,
} from './Example2ListScreen';

export type MainStackParamList = {
  Example2List: Example2ListScreenParams;
  Example2Details: Example2DetailsScreenParams;
};

export const MainStackScreens = (
  <>
    <MainStack.Screen name="Example2List" component={Example2ListScreen} />
    <MainStack.Screen
      name="Example2Details"
      component={Example2DetailsScreen}
    />
  </>
);
