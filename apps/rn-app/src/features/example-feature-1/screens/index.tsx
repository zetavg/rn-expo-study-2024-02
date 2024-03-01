import { MainStack, ModalStack } from '@/navigation/navigators';

import Example1DetailsScreen, {
  Params as Example1DetailsScreenParams,
} from './Example1DetailsScreen';
import Example1EditScreen, {
  Params as Example1EditScreenParams,
} from './Example1EditScreen';
import Example1ListScreen, {
  Params as Example1ListScreenParams,
} from './Example1ListScreen';

// A. MainStack navigation.

// A.1. Compose MainStackScreens by including Screens that should be part of MainStack.
export const MainStackScreens = (
  <>
    <MainStack.Screen name="Example1List" component={Example1ListScreen} />
    <MainStack.Screen
      name="Example1Details"
      component={Example1DetailsScreen}
    />
  </>
);

// A.2. Create MainStackParamList by combining Params from each Screen included in MainStackScreens.
export type MainStackParamList = {
  Example1List: Example1ListScreenParams;
  Example1Details: Example1DetailsScreenParams;
};

// B. ModalStack navigation.

// B.1. Compose ModalStackScreens by including Screens that should be part of ModalStack.
export const ModalStackScreens = (
  <>
    <ModalStack.Screen name="Example1Edit" component={Example1EditScreen} />
  </>
);

// B.2. Create ModalStackParamList by combining Params from each Screen included in ModalStackScreens.
export type ModalStackParamList = {
  Example1Edit: Example1EditScreenParams;
};
