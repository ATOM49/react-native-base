// Jest matchers from @testing-library/react-native are built in since v13.

// AsyncStorage has no native module in the Jest environment.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
