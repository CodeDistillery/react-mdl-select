const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: [
        'babel-polyfill',
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-mdl-select.min.js'
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused      : true,
                warnings    : false,
                drop_console: true,
                unsafe      : true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("react-mdl-select.min.css", {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
    ],

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css", "css-loader")
            }
        ]
    }
};