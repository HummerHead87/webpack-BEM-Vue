const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const PostCssInlineSvg = require('postcss-inline-svg');
const PostCssSvgo = require('postcss-svgo');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const autoprefixerConfig = { browsers: ['last 5 versions', 'ie 11'] };
const postCssConfig = [autoprefixer(autoprefixerConfig), PostCssInlineSvg, PostCssSvgo];

const lessOptions = { sourceMap: isDevelopment };

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    vendor: ['./src/vendor/index.js'],
    common: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    //   filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
    filename: 'js/[name].js',
  },
  externals: {
    jquery: 'jQuery',
    $: 'jQuery',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      'jquery-ui': 'jquery-ui/ui/widgets',
      'jquery-ui-css': 'jquery-ui/../../themes/base',
      '@': resolve('src'),
    },
  },
  watch: isDevelopment,
  devtool: isDevelopment ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    noInfo: isDevelopment,
    overlay: {
      warnings: true,
      errors: true,
    },
    quiet: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          options: {
            emitError: true,
            failOnWarning: !isDevelopment,
            failOnError: true,
          },
        }],
    },

    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          less: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: lessOptions,
            }, {
              loader: 'less-loader',
              options: lessOptions,
            }],
            fallback: 'vue-style-loader', // <- это внутренняя часть vue-loader, поэтому нет необходимости его устанавливать через NPM
          }),
        },
        postcss: postCssConfig,
        // other vue-loader options go here
      },
    },

    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'style-loader',
      }),
    },

    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader', // https://github.com/webpack-contrib/html-loader
        options: {
          // attrs: [':data-src'],
          interpolate: true, // добавляет возможность вставлять в аттрибуты
          // элементов картинки через ES6 string interpolation синтаксис
        },
      },
    },

    {
      test: /\.(png|jpe?g|gif)$/,
      loaders: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/',
        },
      },
      'img-loader',
      ],

    },

    {
      test: /\.(svg)$/,
      include: [
        path.resolve(__dirname, './src/common.blocks'),
      ],
      loaders: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/',
        },
      },
      'img-loader',
      ],

    },

    {
      test: /\.(svg|eot|ttf|woff|woff2)$/,
      exclude: [
        path.resolve(__dirname, './src/assets/svg'),
        path.resolve(__dirname, './src/common.blocks'),
      ],
      loaders: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      }],
    },

    {
      test: /\.svg$/,
      include: [
        path.resolve(__dirname, './src/assets/svg/multicolor'),
      ],
      loaders: [{
        loader: 'svg-sprite-loader',
      },
      {
        loader: 'svgo-loader',
      }],
    },

    {
      test: /\.svg$/,
      include: [
        path.resolve(__dirname, './src/assets/svg/monocolor'),
      ],
      loaders: [{
        loader: 'svg-sprite-loader',
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { removeUselessStrokeAndFill: true },
            { removeAttrs: { attrs: '(fill|id|fill-opacity)' } },
            { removeStyleElement: true },
          ],
        },
      }],
    },

    {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: lessOptions,
        }, {
          loader: 'less-loader',
          options: lessOptions,
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return postCssConfig;
            },
          },
        }],
        fallback: 'style-loader',
      }),
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(), // otherwise error still gives a file
    new ExtractTextPlugin('css/[name].css'),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      suppressSuccess: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: !isDevelopment,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'manual',
      chunks: ['vendor', 'common'],
    }),
    // для добавления отдельной html страницы нужно подключить новый HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      template: 'src/test.html',
      filename: 'test.html',
      chunksSortMode: 'manual',
      chunks: ['vendor', 'common'],
    }),
  ],
};

if (!isDevelopment) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }));
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'",
      },
    }));
}
