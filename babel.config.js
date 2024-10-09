module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['module:react-native-dotenv', {
        "moduleName": "@env", // This is the module name for importing env variables
        "path": ".env",        // Path to your .env file
        "safe": false,
        "allowUndefined": true,
      }]
    ],
  };
};
