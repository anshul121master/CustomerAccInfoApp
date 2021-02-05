const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json')

const devConfig = {
    mode:'development',
    output:{
        publicPath: 'http://localhost:8081/'
    },
    devServer:{
        port: 8081,
        historyApiFallback:{
            index:'index.html'
        }
    },
        plugins:[
            new ModuleFederationPlugin({
                name: 'customeraccinfo',
                filename: 'remoteEntry.js',
                exposes: {
                    './CustomerAccInfoApp': './src/bootstrap'
                },
                shared: packageJson.dependencies
            })
        ]
    }


module.exports = merge(commonConfig, devConfig);