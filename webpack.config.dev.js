const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    entry: {
        main: ['./src/browser/index.js', hotMiddlewareScript]
    },
    output: {
        path: '/public',
        publicPath: '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["css-hot-loader",MiniCssExtractPlugin.loader,"css-loader","postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "main.css",
            chunkFilename: "[id].css"
        })
    ]
};
