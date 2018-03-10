const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: __dirname + '/index.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: {
                loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]"
            }
        }, {
            test: /\.html$/,
            loader: 'html-withimg-loader'
        }]
    },
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        // host: '10.75.164.126',
        // host:'192.168.0.153',
        host: '192.168.0.185',
        inline: true
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index/index.tmpl.html'
            // template:'html-withimg-loader!'+__dirname + '/app/index.tmpl.html'
            // filename:'index.tmpl.html'
        })
    ]
}