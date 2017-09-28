const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  frontend: path.join(__dirname, 'frontend'),
  build: path.join(__dirname, 'public'),
};

const commonConfig = {

  entry: {
    frontend: PATHS.frontend,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Jobber',
      template: path.join(PATHS.frontend, 'template.html')
    }),

    new CopyWebpackPlugin([{
      from: path.join(PATHS.frontend, 'img'),
      to: 'assets/img'
    }])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        include: PATHS.app,
        exclude:/node_modules/,

        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|svg)$/,

        use: {
          loader: 'url-loader',
          options: {
            limit: 15000,
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use:{
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
    ]
  }

};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
      proxy: {
        '/api/**': "http://192.168.0.101:3000/"
      }
    },
  };

  return Object.assign(
    {},
    commonConfig,
    config
  );
};

module.exports = (env) => {
  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig();

};
