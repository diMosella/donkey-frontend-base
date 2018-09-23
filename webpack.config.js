'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devOverrides = require('./webpack.dev.js');
const prodOverrides = require('./webpack.prod.js');

const PATH_SRC = path.join(__dirname, 'src');
const PATH_DIST = path.join(__dirname, 'dist');
const PATH_PUBLIC = '/';
const PATH_START = path.join(PATH_SRC, 'index.jsx');
const FILE_INDEX = 'index.html';
const FILE_INDEX_TEMPLATE = 'index.template.ejs';

process.traceDeprecation = true;

/* using `localhost` will prevent exposing the app
    to expose the app use: */
// const ip = require('ip');
// const SERVER_HOST = ip.address();
const SERVER_HOST = 'localhost';
const SERVER_PORT = process.env.PORT || 8080;

const BASE_CONFIG = {
  entry: {
    app: [
      PATH_START
    ],
    libs: [
      'immer',
      'prop-types',
      'react',
      'react-dom',
      'react-localize-redux',
      'react-redux',
      'react-router-dom',
      'redux'
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
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
  plugins: [
    new CleanWebpackPlugin([PATH_DIST]),

    /* creates a html-file in the dist folder */
    new HtmlWebpackPlugin({
      template: path.join(PATH_SRC, FILE_INDEX_TEMPLATE),
      title: 'Donkey Front-end Base module',
      hash: false,
      favicon: path.join(PATH_SRC, 'favicon.ico'),
      filename: FILE_INDEX,
      inject: 'head',
      xhtml: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.NamedModulesPlugin()
  ]
};

module.exports = (env, argv) => {
  const isProd = (argv && argv.mode && typeof argv.mode === 'string' && argv.mode.toLowerCase() === 'production');
  return merge(BASE_CONFIG, isProd ? prodOverrides : devOverrides(PATH_DIST, PATH_PUBLIC, SERVER_HOST, SERVER_PORT));
};
