const postcsspxtoviewport = require('postcss-px-to-viewport');
module.exports = {
    plugins: {
      'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 7']
      },
      'postcss-pxtorem': {
        rootValue: 37.5,
        propList: []
      },
      // 'postcsspxtoviewport': {
      //   viewportWidth: 375,
      //   viewportHeight: 667,
      //   unitPrecision: 3,
      //   viewportUnit: 'vw',
      //   selectorBlackList: [],
      //   minPixelValue: 1,
      //   mediaQuery: false,
      // }
    }
  }
  