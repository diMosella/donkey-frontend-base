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
  devtool: 'cheap-module-eval-source-map'
});
