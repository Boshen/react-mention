const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: './page/index.tsx',

  devtool: 'inline-source-map',

  devServer: {
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
        emitErrors: true,
        formatter: 'stylish'
      }
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './page/index.html'
    }),
  ]

}
