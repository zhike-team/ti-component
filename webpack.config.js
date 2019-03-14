const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'index.js',
    library: "tiComponent",
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, './src'),
        use: ['babel-loader'],
      }, {
        test: /\.js$/,
        include: path.join(__dirname, './src'),
        use: ['eslint-loader'],
      }, {
        test: /\.(png|jpg|gif|ttf)$/,
        use: [{
          loader: 'url-loader',
        }],
      },
    ],
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
    "@zhike/ti-ui": {
      root: '@zhike/ti-ui',
      commonjs: '@zhike/ti-ui',
      commonjs2: '@zhike/ti-ui',
      amd: '@zhike/ti-ui',
    },
    "aphrodite": {
      root: 'aphrodite',
      commonjs: 'aphrodite',
      commonjs2: 'aphrodite',
      amd: 'aphrodite',
    },
    "axios": {
      root: 'axios',
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios',
    },
    "cookie": {
      root: 'cookie',
      commonjs: 'cookie',
      commonjs2: 'cookie',
      amd: 'cookie',
    },
    "lodash": {
      root: 'lodash',
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
    },
    "form-data": {
      root: 'form-data',
      commonjs: 'form-data',
      commonjs2: 'form-data',
      amd: 'form-data',
    },
    "history": {
      root: 'history',
      commonjs: 'history',
      commonjs2: 'history',
      amd: 'history',
    },
    "routers": {
      root: 'routers',
      commonjs: 'routers',
      commonjs2: 'routers',
      amd: 'routers',
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};
