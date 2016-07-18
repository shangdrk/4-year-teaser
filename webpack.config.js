module.exports = {
  entry: './components/App.jsx',
  output: {
    path: './components',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
 };