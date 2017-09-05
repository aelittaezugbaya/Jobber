const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),
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
