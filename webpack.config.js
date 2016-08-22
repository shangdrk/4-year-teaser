/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

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
