var webpack = require('webpack');

module.exports = [
    {
        entry: "./demo/app.tsx",
        devServer: {
            port: 7777
        },
        node: {
            fs: "empty"
        },
        output: {
            filename: 'demo/dist/app.js'
        },
        resolve: {
            extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        },
        devtool: 'source-map', // if we want a source map 
        module: {
            loaders: [
                { test: /\.css$/, loader: "style-loader!css-loader" },
                { test: /\.tsx?$/, loader: 'ts-loader' }
            ]
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
    }
];