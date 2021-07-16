const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    path: ['./index.js'],
  },
  /**
   * webpack 整体打包的时候会打包成 (function(){ ....代码内容....})() 这样一个立即执行的方法，
   * 在这个方法里有我们所有的代码内容。当配置了library之后，webpack 在打包的时候就会配置成如下格式：
   * var react15 = (function(){})()
   * 变量 react15 是存放在全局的，通过 react15 这个全局变量就可以拿到各个生命周期方法
   */
  output: {
    path: path.resolve(__dirname, 'dist'),
    /**
     * 把子应用打包成 umd 库格式(支持commonJS，即浏览器环境、node环境都可以进行引用)
     */
    libraryTarget: 'umd',
    filename: 'react15.js', // 文件打包出来的名字
    /**
     * 可以使我们在当前全局环境下获取我们当前打包的内容，即通过 window.react15 可
     * 以获取子应用打包的内容，在微前端框架里会用到这一信息(value值对应子应用名称)
     */
    library: 'react15',
    // 会把 AMD 模块命名为 UMD 构建
    umdNamedDefine: true,
    publicPath: 'http://localhost:9002/',
  },
  module: {
    rules: [
      {
        test: /\.js(|x)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(c|sc)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  optimization: {
    splitChunks: false,
    minimize: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 告诉服务器从哪里提供内容
    hot: true, // 是否热更新
    compress: true,
    port: 9002,
    headers: {
      /**
       * 配置本地服务的跨域，允许所有的资源可以被访问
       *
       * 注：为什么要配置跨域呢？
       *
       * 在写微前端框架的时候，其实我们需要在主应用里或者框架里去获取当前本地服务里的内容。
       * 如果在获取的时候不去给它设置跨域，会出现资源的拦截，导致无法获取子应用中的内容，因
       * 此需设置成允许跨域
       */
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
};
