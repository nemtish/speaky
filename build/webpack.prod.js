const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const prodConfig = {
    mode: 'production'
};

common.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            ROOT_API_URL: '"https://speaky.app"',
        }
    }),
);

module.exports = merge(common, prodConfig);
