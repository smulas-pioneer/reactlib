var webpack = require('webpack');

module.exports = [
   {
        name: 'dist',
        cache: true,
        entry: {
            lib:  './app.tsx',
        },
        output: {
            path: 'dist',
            filename: '[name].js'
        },
        devServer: {
            hot: true,
            port: 7777,
            contentBase: "./"
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