/**
 * Created by daiyi on 5/27/16.
 */
var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var contextUrl = "public";
var absoluteContext = __dirname + "/" + contextUrl;

module.exports = {
  context: contextUrl,
  //插件项
  plugins: [commonsPlugin],
  //页面入口文件配置
  entry: {
    index : './scripts/index.js'
  },
  //入口文件输出配置
  output: {
    path: absoluteContext,
    filename: './dist/[name].bundle.js'
  },
  module: {
    //加载器配置
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  //其它解决方案配置
  resolve: {
    root: absoluteContext, //绝对路径
    extensions: ['', '.js', '.json', '.scss'],
    alias: {
      AppStore : 'js/stores/AppStores.js',
      ActionType : 'js/actions/ActionType.js',
      AppAction : 'js/actions/AppAction.js'
    }
  }
};
