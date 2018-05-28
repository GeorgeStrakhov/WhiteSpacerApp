const path = require('path');
const merge = require('webpack-merge');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'source-map',

    // output: {
    //     path: path.join(__dirname, '/'),
    //     filename: '[name].[chunkhash].js'
    //
    //
    // },

    // output: {
    //     path: path.resolve('./build'),
    //     publicPath: './build/',
    //     filename: '[name].[chunkhash].js'
    // },

    output: {
        path: path.join(__dirname, '/'),
        filename: '[name].js'
    },

    // plugins: [
    //     new CleanWebpackPlugin(['/'])
    // ]

});