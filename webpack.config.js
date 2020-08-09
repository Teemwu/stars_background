const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const BASE_URL = isProduction ? '/dist/' : '/'

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?&/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'StarsBackground',
            filename: 'index.html',
            template: 'index.html',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        host: '0.0.0.0',
        port: 5656,
        openPage: 'http://localhost:5656',
        hot: true,
        compress: true,
        open: true,
        overlay: true
    },

    output: {
        publicPath: BASE_URL,
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}