const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: [
            path.join(__dirname, '/public')
        ],
        proxy: {
            '/css': {
                target: 'http://localhost:3000'
            }
        },
        watchContentBase: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};