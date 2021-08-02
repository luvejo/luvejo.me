const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin =
  require('html-inline-css-webpack-plugin').default
const CopyPlugin = require('copy-webpack-plugin')

const path = require('path')

const { loadData } = require('./webpack.helpers')

const appEnv =
  process.env.NODE_ENV === 'development' ? 'development' : 'production'

module.exports = {
  mode: appEnv,

  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          knownHelpersOnly: false,
          helperDirs: [path.join(__dirname, '/src/helpers')],
          inlineRequires: /\/img\//gi,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s[ac]|c)ss$/,
        exclude: /node_modules/,
        use: [
          appEnv === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  devServer: {
    contentBase: './dist',
  },

  target: appEnv === 'development' ? 'web' : 'browserslist',

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.hbs',
      inject: true,
      scriptLoading: 'defer',
      templateParameters: {
        projects: loadData('projects.yml'),
        appEnv,
      },
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/assets/img/', to: './' }],
    }),
  ],
}
