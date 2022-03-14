const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'lect.js',
        path: path.resolve(__dirname, 'dist'),
        // libraryTarget: 'window'
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
                        // plugins: [
                        //     ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                        //     ['@babel/plugin-proposal-class-properties', { 'loose': true }],
                        //     ['@babel/plugin-proposal-private-property-in-object', { 'loose': true }],
                        //     ['@babel/plugin-proposal-private-methods', { 'loose': true }],
                        // ]
                    }
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.ts']
    },
    target: ['web', 'es5']
}