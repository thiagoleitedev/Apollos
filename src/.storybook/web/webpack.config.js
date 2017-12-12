/* eslint-disable */


// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  console.log('BASE', config);

  config.resolve = {
    modules: ['node_modules'],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
    }
  };

  config.module.loaders = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [
        'react-hot',
        'babel-loader?cacheDirectory=true'
      ]
    },
    {
      // Most react-native libraries include uncompiled ES6 JS.
      test: /\.js$/,
      include: [/node_modules\/react-native-/, /node_modules\/rn-/],
      loader: 'babel-loader',
      query: { cacheDirectory: true }
    },
  ];

  console.log('NEW', config);

  // config.module.rules.push({
  //   test: /\.css$/,
  //   loader: 'style-loader!css-loader?url=false'
  // });

  return config;
};
