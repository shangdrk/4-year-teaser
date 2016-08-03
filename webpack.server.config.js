module.exports = {
  entry: './server.js',
  output: {
    path: './',
    filename: 'server.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
