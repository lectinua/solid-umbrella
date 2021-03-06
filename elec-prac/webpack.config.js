const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: {
        'main': './main.ts',
        'lect': './src/scripts/index.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'umd',
            umdNamedDefine: true,
        },
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    target: ['electron-main', 'electron-renderer'],
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.ts']
    }
}