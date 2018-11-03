const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (docRoot, urlPath, host, port) => ({
  mode: 'development',
  devServer: {
    contentBase: docRoot,
    publicPath: urlPath,
    host: host,
    port: port,
    hot: true,
    compress: true,
    historyApiFallback: true,
    watchContentBase: true
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: ['node_modules', 'src/**/*.spec.js']
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    /* creates separate css-files in the dist folder */
    new ExtractTextPlugin({
      filename: '[name].[hash].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
