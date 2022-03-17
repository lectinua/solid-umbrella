const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    entry: {
        'main': './main.ts',
        'lect': './src/scripts/index.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /(\.js|\.ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.ts']
    },
    target: ['electron-main', 'electron-renderer'],
    externalsPresets: { node: true },
    externals: [nodeExternals()]
}