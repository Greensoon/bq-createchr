const path = require('path')
var fs = require('fs')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin');

const minicss = new MiniCss({
    filename: 'style.css'
})
const WebpackCopy = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV
var $pages = fs.readdirSync(path.resolve(__dirname, './src/pages'))
var htmlTpls = [];

$pages.forEach(function(e) {
    htmlTpls.push(
        new HtmlWebpackPlugin({
            template: './src/pages/' + e,
            inject: 'body',
            filename: e,
            minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            }
        })
    )
})

const enters = require('./entry.js')

const entries = enters.server || {}

const manifest = require('./manifest.json')
// content资源
const jsAndCss = manifest.scriptsAndCss
if(jsAndCss) {
    jsAndCss.forEach(function(e) {
        e.js && e.js.forEach(function(el) {
            var name = el.match(/\/(\w+\.?\w+)\.js$/)[1]
            entries[name] = el
        })
    })
}

// background
var background = manifest.background
if(background && background.scripts && background.scripts.length) {
    entries.background = background.scripts
}

// 需要注入的脚本
const injects = manifest.injects
if(injects) {
    entries.injects = injects
}

// 出口文件
if(!Object.keys(entries).length) {
    console.log(' ====>>> 需要给出入口文件')
    return false
}

var c = Object.assign({}, entries)
c.client = enters.client
// 客户端配置
const clientConfig = {
    entry: c,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, env === 'development' ? 'tmp/' : 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory=true',
                exclude: [/node_modules/],
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCss.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCss.loader, 'css-loader', 'less-loader' ]
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        minicss,
        new WebpackCopy([
            {from: 'assets', to: path.resolve(__dirname, env === 'development' ? 'tmp/' : 'dist/')}
        ]),
    ],
    mode: 'development',
    devtool: 'none',
    devServer: {
        port: 3000
    }
}

// const config = {
//     entry: entries,
//     output: {
//         path: path.resolve(__dirname, env === 'development' ? './tmp': './dist'),
//         filename: '[name].js'
//     },
//     module: {
//         rules: [{
//             test: /\.js$/,
//             loader: 'babel-loader?cacheDirectory=true',
//             exclude: [/node_modules/],
//             options: {
//                 presets: ['@babel/preset-env']
//             }
//         }]
//     },
//     plugins: [
//         new WebpackCopy([
//             {from: 'assets', to: path.resolve(__dirname, env === 'development' ? 'tmp/' : 'dist/')}
//         ]),
//     ],
//     mode: 'development',
//     target: 'node',
//     devtool: 'none'
// }

clientConfig.plugins = clientConfig.plugins.concat(htmlTpls)

module.exports = [clientConfig]