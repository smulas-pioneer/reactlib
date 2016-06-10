var webpack = require('webpack');

module.exports = [
    {
        name: 'client',
        cache: true,
        entry: {
            app:  './demo/App.tsx',
            //main: './src/server/main.ts'
        },
         devServer: {
            hot: true,
            port: 7777,
            contentBase: "./demo"
        },
        output: {
            path: 'demo/build',
            filename: '[name].js'
        },
        resolve: {
            extensions: ['','.webpack.js', '.web.js', '.ts', '.tsx','.js']
        },
        devtool: 'source-map', // if we want a source map 
        module: {
            loaders: [
                {test: /\.css$/,loader: "style-loader!css-loader" },
                {test: /\.tsx?$/,loader: 'ts-loader'}
            ]
        }
    }
];