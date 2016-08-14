module.exports = {
  entry: './components/App.jsx',
  output: {
    filename: 'app.bundle.js',
    sourceMapFilename: 'app.bundle.js.map',
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
};
