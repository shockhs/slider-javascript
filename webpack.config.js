const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = !isDevelopment

const filename = ext => isDevelopment ? `static/${ext}/[name].${ext}` : `static/${ext}/[name].[contenthash:8].${ext}`
const chunkname = ext => isDevelopment ? `static/${ext}/[name].chunk.${ext}` : `static/${ext}/[name].[contenthash:8].chunk.${ext}`


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: ['@babel/polyfill','./slider.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
    },
    devtool: isDevelopment ? 'source-map' : '',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }]
            }
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
        ],
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
};
