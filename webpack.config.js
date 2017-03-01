'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATH_SRC = path.join(__dirname, 'src');
const PATH_DIST = path.join(__dirname, 'dist');
const PATH_PUBLIC = '/';
const PATH_START = path.join(PATH_SRC, 'index.jsx');
const FILE_INDEX = 'index.html';
const FILE_INDEX_TEMPLATE = 'index.template.ejs';

/* using `localhost` will prevent exposing the app
    to expose the app use: */
// const ip = require('ip');
// const SERVER_HOST = ip.address();
const SERVER_HOST = 'localhost';
const SERVER_PORT = process.env.PORT || 8080;

module.exports = {
  entry: {
    app: [
      // for template strings, use backticks
      `webpack-dev-server/client?http://${SERVER_HOST}:${SERVER_PORT}`,
      'webpack/hot/only-dev-server',
      PATH_START
    ],
    libs: [
      `webpack-dev-server/client?http://${SERVER_HOST}:${SERVER_PORT}`,
      'webpack/hot/only-dev-server',
      'react',
      'react-redux',
      'react-router',
      // 'reactstrap',
      'redux'
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: [
            'style-loader',
            'css-loader'
          ],
          use: 'postcss-loader'
        })
      },
      /** since webpack 2 json is loaded automatically **/
      /* {
        test: /\.json$/,
        use: 'json-loader'
      }, */
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'svg-url-loader?limit=10000&mimetype=application/svg+xml'
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192'
      },
      {
        test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: `[name].js`,
    path: PATH_DIST,
    publicPath: PATH_PUBLIC
  },

  devServer: {
    inline: true,
    hot: true,
    contentBase: PATH_DIST,
    host: SERVER_HOST,
    port: SERVER_PORT,
    compress: false,
    historyApiFallback: true,
    noInfo: true
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    /* creates a html-file in the dist folder */
    new HtmlWebpackPlugin({
      template : path.join(PATH_SRC, FILE_INDEX_TEMPLATE),
      title    : 'Donkey Starter Kit',
      hash     : false,
      favicon  : path.join(PATH_SRC, 'favicon.ico'),
      filename : FILE_INDEX,
      inject   : 'head',
      xhtml    : true,
      minify   : {
        collapseWhitespace : true
      }
    }),

    /* creates separate css-files in the dist folder */
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
};
