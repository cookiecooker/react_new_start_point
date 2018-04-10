const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const serverConfig = {
    target: 'node',
    externals: [nodeExternals()],
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
        new MiniCssExtractPlugin({
            filename: "main.css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            __isBrowser__: false
        })
    ]
};

const browserConfig = {
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
        new MiniCssExtractPlugin({
            filename: "main.css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            __isBrowser__: true
        })
    ]
};

module.exports = serverConfig