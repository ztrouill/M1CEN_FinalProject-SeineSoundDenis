const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: "main.js",
    path: path.join(__dirname, 'seine-sound-denis')
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
	   {
        test: /\.(png|jpe?g|gif|svg|wav|mp3|ttf|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'assets/[hash].[ext]'
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}
