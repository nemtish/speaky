const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        progress: true,
        inline: true,
        open: true,
        host: 'localhost',
        port: 8080,
        watchOptions: {
            poll: true
        }
    }
});
