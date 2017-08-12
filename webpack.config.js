const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        path: path.resolve(__dirname, './src/main.js')
    }
    ,
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, './build')
    },
    module: {
        rules: [
            {
                test: /.\js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react',"stage-2"]
                    }
                },
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "src")
            },
            {
                test: /\.(jpg||png||gif||svg||jpeg)$/i,
                use: [
                    { loader: 'url-loader', options: { limit: 2000 } },
                    'image-webpack-loader'
                ]
            },
            {
                test: /.\less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader', options: {
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: ['last 4 versions']
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader', options: {
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: ['last 4 versions']
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "/build"),
        hot: true,
        compress: true,
        inline: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Study',
            filename: 'index.html',
            inject: 'body',
            template: './index_tpl.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};