
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: [
        'regenerator-runtime/runtime',
        './src/app.js',
        './src/polyfill.js'
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(js|vue)$/,
                use: 'eslint-loader',
                enforce: 'pre'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin([{
            from: resolve('static/img'),
            to: resolve('dist/static/img'),
            toType: 'dir'
        }])
    ]
}
