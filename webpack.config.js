const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './public/build'),
    publicPath: '/',
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  entry: {
    site: [
      './client/index.js',
      './client/index.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Personal Library',
      template: path.resolve(__dirname, './client/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/,
        type: 'asset/resource'
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ]
  }
}
