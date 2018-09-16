const ExtractTextPlugin = require('extract-text-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = (docRoot, urlPath, host, port) => ({
  mode: 'development',
  serve: {
    add: (app, middleware, options) => {
      const historyOptions = {
        // TODO: headers, rewrites, etc., see: https://github.com/bripkens/connect-history-api-fallback#options
      };
      app.use(convert(history(historyOptions)));
    },
    content: docRoot,
    dev: {
      publicPath: urlPath
    },
    host: host,
    hot: true,
    port: port
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        /* use: ExtractTextPlugin.extract({
          fallback: [
            'style-loader',
            'css-loader'
          ],
          use: [
            'postcss-loader',
            'sass-loader'
          ]
        }) */
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
    })
  ]
});
