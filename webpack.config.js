const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './slider.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
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
            new TerserPlugin()
        ],
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
}
