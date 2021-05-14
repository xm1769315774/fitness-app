// 创建 webpack.config.js 配置文件


//引入nodejs内置模块，可以拿到当前文件的跟目录
const path = require('path');


//引入打包html插件
const HtmlWebpackPlugin=require("html-webpack-plugin");


//引入 提取js中的css代码的插件
const  MiniCssExtractPlugin = require('mini-css-extract-plugin');  
//将css文件及代码进行极致压缩s
const  OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports={
    // 入口
    entry:"./src/js/home.js",
    //出口
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"js/[name]-[hash:10].js",//修改出口中的js文件名 为动态获取
        publicPath: './'
    },

    //解释器
    module:{
        rules: [
            {
                test: /\.css$/,          //正则表达式  匹配需要应用这个规则的所有文件是哪些
                use: [MiniCssExtractPlugin.loader, 'css-loader']    //使用哪些三方包去处理匹配出来的这些文件 
               
            },
            {
                test: /\.less$/,          //正则表达式  匹配需要应用这个规则的所有文件是哪些
                use: [MiniCssExtractPlugin.loader, 'css-loader','less-loader']       //使用哪些三方包去处理匹配出来的这些文件 
               
            },
            {
                test:/\.(png|jpg|gif)$/,        //正则表达式  匹配需要应用这个规则的所有文件是哪些
                loader:'url-loader',       //使用哪些三方包去处理匹配出来的这些文件 
                options:{
                    name: '[hash:16].[ext]',  // 图片输出的名字hash长度16位 默认32位
                    limit: 100 * 1024,  // 限制 小于70kb base64处理
                    outputPath:"img"
              }
            },
            {
                test:/\.html$/,    //配置html文件打包
                loader:'html-loader'  
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/  // 排除
          },
        
        ]
        },

    //插件
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/page/home.html"
        }),
        new MiniCssExtractPlugin({  
            filename: 'css/[name].css' // 输出到css文件夹里
      }),
      new OptimizeCssAssetsWebpackPlugin()   
    ],
    
    //环境
    mode:process.env.NODE_ENV,

    // 开发服务器 配置【】
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
    compress: true, // 启动gzip
    port: 8089,  // 端口  8080 80  8081 8082
    open: true, // 自动打开服务
    publicPath: '/', // 静态资源查找路径
    openPage: 'index.html', // 打开的页面
  },
   target: 'web', // 目标是浏览器
}