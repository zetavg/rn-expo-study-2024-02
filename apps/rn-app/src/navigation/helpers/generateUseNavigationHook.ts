import {
  ParamListBase,
  StackActionHelpers,
  useNavigation,
} from '@react-navigation/native';

export default function generateUseNavigationHook<
  ParamList extends ParamListBase,
>(navigatorID: string) {
  return () => {
    const navigation = useNavigation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchedNavigation = navigation.getParent(navigatorID as any);

    if (!matchedNavigation) {
      throw new Error(
        `Expected to find a navigator with ID "${navigatorID}" in the navigator tree. Please make sure that this hook is used within a screen that is under the "${navigatorID}" navigator.`,
      );
    }

    return matchedNavigation as unknown as StackActionHelpers<ParamList>;
  };
}
