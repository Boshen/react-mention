const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',

    './page/index.tsx'
  ],

  devtool: 'source-map',

  devServer: {
    hot: true,
    stats: 'errors-only'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      exclude: [
        /node_modules/
      ],
      query: {
        formatter: 'stylish'
      }
    }, {
      test: /\.tsx?$/,
      loaders: [
        'react-hot-loader/webpack',
        'awesome-typescript-loader'
      ]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './page/index.html'
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new CheckerPlugin(),
  ]

}
