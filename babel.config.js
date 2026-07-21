// NativeWind requires babel-preset-expo with `jsxImportSource: 'nativewind'`
// so that `className` on React Native components maps to styles, plus the
// `nativewind/babel` preset. babel-preset-expo automatically adds the
// react-native-worklets plugin (for Reanimated) when it is installed, so it
// does not need to be listed here.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
