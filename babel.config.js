
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      //  V  MUST BE LAST  V
      "@babel/plugin-transform-export-namespace-from",
      [
        'react-native-reanimated/plugin', 
        {
          relativeSourceLocation: true,
        }
    ],
    ]
  };
};
