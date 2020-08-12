const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 4200
    },
    optimization: {
        minimizer: [new TerserWebpackPlugin()]
    },
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
        ]
    }
}
