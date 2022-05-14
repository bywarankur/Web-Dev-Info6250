const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/todo.js',
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 3000
  },
  output: {
    filename: 'todo.js',
    path: path.resolve(__dirname, 'public'),
  },
};