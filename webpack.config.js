module.exports = {
  entry: {
    admin: './client/src/admin.js',
    infoscreen: './client/src/infoscreen.js'
  },
  output: {
    path: './client/build/js',
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
    ],
  },
  vue: {
    loaders: {
      js: 'babel',
      css: 'vue-style-loader!css-loader!stylus-loader'
    },
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}
