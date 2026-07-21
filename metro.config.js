// Wraps the Expo Metro config with NativeWind so Tailwind classes are compiled
// from `src/global.css`. https://www.nativewind.dev/getting-started/expo-router
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './src/global.css' });
