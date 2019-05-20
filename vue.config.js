
// vue.config.js
const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/front/'
    : '/',
  devServer: {
    // proxy: 'http://test.signin.tueye.com',
    disableHostCheck: true,
    proxy: {
      '/api': {
        // target: 'http://test.signin.tueye.com',
        target: 'http://180.76.156.27:12001',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 16, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ],
      },
    },
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)));
  },
};

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/variable.scss'),
      ],
    });
}
