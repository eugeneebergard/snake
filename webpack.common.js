const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: { filename: path.join('images', '[name].[contenthash][ext]')}
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: { filename: path.join('src/images/icons', '[name].[contenthash][ext]') }
      },
      {
        test: /\.(ico|json)$/i,
        exclude: /node_modules/,
        generator: { filename: path.join('[name].[contenthash][ext]') }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: { filename: path.join(`fonts`, '[name].[contenthash][ext]') }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:  'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        }
      },
    }),
  ],
};

