const path = require('path')
var fs = require('fs')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin');

const minicss = new MiniCss({
    filename: 'css/app.css?v=[hash:6]'
})
const WebpackCopy = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV
var $pages = fs.readdirSync(path.resolve(__dirname, './src/pages'))
var htmlTpls = [];

$pages.forEach(function(e) {
    htmlTpls.push(
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pages/' + e),
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

const entries = {
}

const manifest = require('./manifest.json')
const jsAndCss = manifest.scriptsAndCss
if(jsAndCss) {
    jsAndCss.forEach(function(e) {
        e.js && e.js.forEach(function(el) {
            var name = el.match(/\/(\w+\.?\w+)\.js$/)[1]
            entries[name] = el
        })
    })
}

var background = manifest.background
if(background && background.scripts && background.scripts.length) {
    entries.background = background.scripts
}

const injects = manifest.injects
if(injects) {
    entries.injects = injects
}

if(!Object.keys(entries).length) {
    console.log(' ====>>> 需要给出入口文件')
    return false
}

const config = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, env === 'development' ? './tmp': './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory=true',
            exclude: [/node_modules/],
            options: {
                presets: ['@babel/preset-env']
            }
        }, {
            test: /\.(png|je?pg|gif|bmp)$/,
            loader: 'url-loader?name=img/[name].[ext]&limit=10000'
        },{
            test: /\.css$/,
            use: [MiniCss.loader, 'css-loader']
        },
        {
            test: /\.less$/,
            use: [MiniCss.loader, 'css-loader', 'less-loader' ]
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        },
        {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                  interpolate: true
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        minicss,
        new WebpackCopy([
            {from: 'assets', to: path.resolve(__dirname, env === 'development' ? 'tmp/' : 'dist/')}
        ]),
    ],
    mode: 'development',
    target: 'node',
    devtool: 'none'
}

config.plugins = config.plugins.concat(htmlTpls)

module.exports = config