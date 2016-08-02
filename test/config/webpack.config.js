import config from './config'

const webpackConfig = {
  output: {
    filename: config.exportFileName + '.js',
    libraryTarget: 'umd',
    library: config.mainVarName
  },
  resolve: {
    root: config.sourceDir,
    extensions: ['', '.js', '.jsx', '.json'],
  },
  // Add your own externals here. For instance,
  // {
  //   jquery: true
  // }
  // would externalize the `jquery` module.
  externals: {},
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.json$/, loader: 'json'}
    ]
  },
  devtool: 'source-map'
}

export default webpackConfig
