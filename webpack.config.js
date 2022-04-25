const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      //filename: 'project.mesto.js',
      filename: '[name].[contenthash].js',
      publicPath: '',
      clean: true,
  },
  //mode: 'production',
  devServer: {
    // путь, куда "смотрит" режим разработчика
    static: {
      directory: path.join(__dirname, 'dist'),
  },
    compress: true, // это ускорит загрузку в режиме разработки
    port: 9000, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },

  module: {
    rules: [ // rules — это массив правил

      // добавьте ещё одно правило:
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
            options: {
                importLoaders: 1
                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
            }
          },
        'postcss-loader'
        ]
      },

        // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
        // добавили правило для обработки файлов
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
              filename: 'img/[name].[contenthash][ext][query]',
          }
      },
      {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
              filename: 'fonts/[name][ext][query]',
          }
      },


    ]


  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ]

}
