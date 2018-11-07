const webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const devConfig = {
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
};

common.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            ROOT_API_URL: '"http://localhost:8000"',
        }
    }),
)

module.exports = merge(common, devConfig);
