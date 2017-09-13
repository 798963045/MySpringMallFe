/*
* @Author: KobeP
*/
var webpack             = require('webpack');//加载webpack
var ExtractTextPlugin   = require('extract-text-webpack-plugin');//单独打包css
var HtmlWebpackPlugin   = require('html-webpack-plugin');//对html模板的处理

// 环境变量配置，dev / online   这个是配dev-server的不要后面那段 
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',//模板
        filename    : 'view/' + name + '.html',//打包的名字
        title       : title,  //htmltitle
        inject      : true,
        hash        : true,
        chunks      : ['common', name]//包含基本木块和自己的模块
    };
};
// webpack config
var config = {
    entry: {
        'common'            : ['./src/page/common/index.js'],//不会以common名字加载
        'index'             : ['./src/page/index/index.js'],
        'list'              : ['./src/page/list/index.js'],
        'detail'            : ['./src/page/detail/index.js'],
        'cart'              : ['./src/page/cart/index.js'],
        'order-detail':['./src/page/order-detail/index.js'],
        'order-list'        : ['./src/page/order-list/index.js'],
        'order-confirm':['./src/page/order-confirm/index.js'],
        'payment':['./src/page/payment/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'result'            : ['./src/page/result/index.js'],
        'about'             : ['./src/page/about/index.js'],
    },
    output: {
        path: './dist',
        publicPath : '/dist',//访问文件的地址（打包后的）
        filename: 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery' //加载jquery
    },
    module: {
        loaders: [//检测以css结尾的文件,加载loader,这里两个，从右到左
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },//图片加载
            { test: /\.string$/, loader: 'html-loader'}//对html模板的加载
        ]
    },//别名
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [//抽取通用模块解决方法
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',         //名字
            filename : 'js/base.js'  //输出的名字
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about','关于我们')),
    ]
};
//开发环境上追加这个
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;