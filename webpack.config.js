const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: 'slider.js',
    target: 'web',
    output: {
        filename: 'vm-slider-js.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'sliderJS',
        libraryTarget: 'this',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src')],
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new CleanWebpackPlugin()],
}
