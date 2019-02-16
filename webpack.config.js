'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const donkeyLog = require('./bin/donkey-log');

const devOverrides = require('./webpack.dev.js');
const prodOverrides = require('./webpack.prod.js');

const PATH_SRC = path.join(__dirname, 'src');
const PATH_DIST = path.join(__dirname, 'dist');
const PATH_PUBLIC = '/';
const PATH_START = path.join(PATH_SRC, 'index.jsx');
const FILE_INDEX = 'index.html';
const FILE_INDEX_TEMPLATE = 'index.template.ejs';
const DEFAULT_PROJECT_CONFIG = {
  title: 'Donkey Front-end Base module',
  favicon: path.join(PATH_SRC, 'favicon.ico'),
  mainSourcePath: 'src/'
};

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
    chunkFilename: '[name].bundle.js',
    path: PATH_DIST,
    publicPath: PATH_PUBLIC
  },
  plugins: [
    new CleanWebpackPlugin([PATH_DIST]),
    new webpack.NamedModulesPlugin()
  ]
};

const enhanceByProjectConfig = (projectPath, projectConfigPath, projectModulesPath) => {
  let projectOverrides = {};
  if (typeof projectConfigPath === 'string') {
    try {
      // TODO: add schema validation for configuration
      projectOverrides = require(path.join(projectPath || '', projectConfigPath));
    } catch (exception) {
      donkeyLog.warning(`couldn't load project config overrides`,
        `specified by ${projectConfigPath} on path ${projectPath}:`,
        exception
      );
      projectOverrides = {};
    }
  }
  const projectConfig = { ...DEFAULT_PROJECT_CONFIG, ...projectOverrides };
  const isCustomProject = typeof projectConfig.mainComponent === 'string' &&
      projectOverrides.mainComponent === projectConfig.mainComponent;

  BASE_CONFIG.resolve.symlinks = false;
  if (typeof projectModulesPath === 'string') {
    BASE_CONFIG.resolve.modules = [projectModulesPath, 'node_modules'];
  }
  BASE_CONFIG.plugins.push(
    /* creates a html-file in the dist folder */
    new HtmlWebpackPlugin({
      template: path.join(PATH_SRC, FILE_INDEX_TEMPLATE),
      title: projectConfig.title,
      hash: false,
      favicon: projectConfig.favicon,
      filename: FILE_INDEX,
      inject: 'head',
      xhtml: true,
      minify: {
        collapseWhitespace: true
      }
    })
  );
  BASE_CONFIG.plugins.push(
    new webpack.DefinePlugin({
      '__PROJECT_FEATURE__': JSON.stringify(isCustomProject),
      '__PROJECT_MAIN_COMPONENT__': JSON.stringify(projectConfig.mainComponent)
    })
  );
};

module.exports = (env, argv) => {
  enhanceByProjectConfig(
    typeof argv.projectPath === 'string' ? argv.projectPath : null,
    typeof argv.projectConfig === 'string' ? argv.projectConfig : null,
    typeof argv.projectModules === 'string' ? argv.projectModules : null
  );
  const isProd = (argv && argv.mode && typeof argv.mode === 'string' && argv.mode.toLowerCase() === 'production');
  return merge(BASE_CONFIG, isProd ? prodOverrides : devOverrides(PATH_DIST, PATH_PUBLIC, SERVER_HOST, SERVER_PORT));
};
