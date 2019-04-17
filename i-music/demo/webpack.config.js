
console.log("webpack");

const webpack  = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const openBrowserWebpackPlugin=require("open-browser-webpack-plugin");
const extractTextWebpackPlugin= require("extract-text-webpack-plugin")


module.exports = {
    entry:["./src/main.js"],
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"js/[name].[hash:8].js",
        publicPath:""
    },
    resolve:{
        alias:{
            vue:'vue/dist/vue.js'
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:["babel-loader"]
            },

            // {
            //     test : /\.(mp3)(\?.*)?$/,
            //     loader : 'url-loader',
            //     options : {
            //       name : utils.assetsPath('assets/[name].[hash:7].[ext]')
            //     }
            //   },

            {
                test:/\.(png|gif|jpg|svg|woff|woff2|eot|ttf|mp3)\??.*$/i,
                use:["url-loader?limit=8192&name=font/[hash:8].[name].[ext]"]
            },
            {
                test:/\.vue$/,
                loader:"vue-loader",
                options:{
                    loaders:[
                        {'css':"style-loader!css-loader"},
                        {'scss':"style-loader!css-loader!sass-loader"},
                        {'less':"style-loader!css-loader!less-loader"},
                    ],
                    postcss:function(){
                        return [
                            require('postcss-px2rem-exclude')(
                                {
                                    remUnit:100,
                                    exclude:/mint-ui/i,  // 排除 antd-mobile不需要进行 rem 转换 
                                }
                            ), // px 转 rem 
                        ]
                    }
                }
            },
            {
                test:/\.(css|scss)$/,
                use:extractTextWebpackPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        "css-loader",
                        {
                            loader:"postcss-loader",
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),//CSS代码美化
                                        require("autoprefixer"),//自动补全
                                        require('postcss-px2rem-exclude')(
                                            {
                                                remUnit:100,
                                                exclude:/mint-ui/i,  // 排除 antd-mobile不需要进行 rem 转换 
                                            }
                                        ), // px 转 rem 
                                    ]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                })
            },
            {
                test:/\.(css|less)$/,
                use:extractTextWebpackPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        "css-loader",
                        {
                            loader:"postcss-loader",
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),//CSS代码美化
                                        require("autoprefixer"),//自动补全
                                         // require('postcss-px2rem-exclude')(
                                        //     {
                                        //         remUnit:100,
                                        //         exclude:/mint-ui/i,  // 排除 antd-mobile不需要进行 rem 转换 
                                        //     }
                                        // ), // px 转 rem 
                                    ]
                                }
                            }
                        },
                        "less-loader"
                    ]
                })
            }
        ]
    },
    devtool:"source-map",

    devServer:{
        contentBase:path.join(__dirname,"dist"),
        compress:true,
        hot:true,
        inline:true,
        // open:true   自动打开浏览器
        host:"0.0.0.0",
        // host:"localhost",
        port:7000,
        publicPath:"",
        // histroyApiFallback:true,
        disableHostCheck:true,
        proxy:{

        }
    },
    plugins:[
        new openBrowserWebpackPlugin({url:"http://39.97.96.166:7000"}),
        new htmlWebpackPlugin({
            template:"./public/index.html",
            inject:true
        }),
        new extractTextWebpackPlugin({
            filename:"css/app.[hash:8].css",
            allChunks:true,
            disable:false
        })
      
    ]
}