const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (docRoot, host, port) => ({
  mode: 'development',
  devServer: {
    colors: true,
    inline: true,
    hot: true,
    contentBase: docRoot,
    host: host,
    port: port,
    compress: false,
    historyApiFallback: true,
    noInfo: true
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: [
            'style-loader',
            'css-loader'
          ],
          use: [
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    /* creates separate css-files in the dist folder */
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
});
