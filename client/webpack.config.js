let path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');

var config = {
    devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'index.js')
  ],
  output: {
        path: BUILD_DIR,
        filename: 'bundle_src.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(mp3|png|svg|jpg)$/,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
  }
};

module.exports = config;