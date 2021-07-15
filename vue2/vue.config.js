const path = require('path');
const { name } = require('./package'); // 获取当前项目的名称

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 9004;

module.exports = {
  outputDir: 'dist', // 打包目录
  assetsDir: 'static', // 打包的静态资源目录
  filenameHashing: true, // 打包出来的文件带有hash信息
  publicPath: 'http://localhost:9004', // 公共路径
  // 本地服务
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 告诉服务器从哪里提供内容
    hot: true, // 是否热更新
    disableHostCheck: true,
    port,
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
  },
  // 自定义webpack配置，替换 vue-cli-service 里面的 webpack 的一些配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    /**
     * 在进行微前端项目改造时，必须配置output下方选项
     */
    output: {
      /**
       * 把子应用打包成 umd 库格式(支持commonJS，即支持浏览器环境、node环境)
       */
      libraryTarget: 'umd',
      filename: 'vue2.js', // 文件打包出来的名字
      /**
       * 可以使我们在当前全局环境下获取我们当前打包的内容，即通过 window.vue2 可
       * 以获取子应用打包的内容，在微前端框架里会用到这一信息(value值对应子应用名称)
       */
      library: 'vue2',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
