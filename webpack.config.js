// const path = require('path');

// module.exports = [{
//     name: 'client',
//     entry: './src/public/client.js',
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, 'dist/public'),
//     },
//     target: 'node',
//     mode: 'development',
//     devServer: {
//         contentBase: './dist/public',
//     },
//     module: {
//         rules: [{
//             test: /\.css$/,
//             use: [
//                 'style-loader',
//                 'css-loader',
//             ],
//         }],
//     }
// }, {
//     name: 'server',
//     mode: 'development',
//     entry: './src/server/index.js',
//     target: 'node',
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, 'dist/server'),
//     },
// }];


const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require("html-webpack-plugin")
module.exports = [{
  mode: 'development',
  entry: {
    server: './src/server/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: './server/index.js'
  },
  target: 'node',
  node: {
    __dirname: false, 
    __filename: false, 
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [{loader: "html-loader"}]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/public/index.html",
      filename: "./public/index.html",
      excludeChunks: [ 'server' ]
    })
  ]
}, {
    name: 'client',
    entry: './src/public/client.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/public'),
    },
    target: 'node',
    mode: 'development',
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ],
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            loader: "file-loader?name=/public/assets/images/[name].[ext]"
        }],
    }
}];