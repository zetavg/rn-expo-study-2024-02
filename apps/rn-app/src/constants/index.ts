import ExpoConstants from 'expo-constants';

export const Constants = {
  appVersion: ExpoConstants.expoConfig?.extra?.fullVersion || 'unknown',
};

export default Constants;
