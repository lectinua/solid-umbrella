const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: '/src/index.ts',
    output: {
        filename: 'lect_[chunkhash:8].js',
        path: Path.resolve(__dirname, 'dist'),
        libraryTarget: "window"
    },
    module: {
        rules: [
            {
                test: /(\.js|\.ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                            ['@babel/plugin-proposal-class-properties', { 'loose': true }],
                            ['@babel/plugin-proposal-private-property-in-object', { 'loose': true }],
                            ['@babel/plugin-proposal-private-methods', { 'loose': true }],
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.ts']
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.ejs',
            inject: false,
            // minify: true,
            meta: {
                'description': 'lect prac'
            },
            templateParameters: {
                title: 'Welcome',
                lang: 'ko-KR'
            },
        }),
    ],
    target: ['web', 'es5']
};