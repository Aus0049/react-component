/**
 * Created by Aus on 2017/11/8.
 */
// 压缩之后在线运行
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const debug = require('debug')('app:prod:online')
const fs = require('fs-extra')
const webpackCompiler = require('../build/webpack-compiler')

const app = express()
const paths = config.utils_paths

app.use(require('connect-history-api-fallback')())

const compile = () => {
    return Promise.resolve()
        .then(() => webpackCompiler(webpackConfig))
        .then(stats => {
            fs.copySync(paths.client('static'), paths.dist())
        })
        .then(() => {
            debug('Compilation completed successfully.')
        })
        .catch((err) => {
            debug('Compiler encountered an error.', err)
            process.exit(1)
        })
};

compile()
    .then(()=>{
        app.use(express.static(paths.dist()))
        debug(`🍺server running on port: ${config.server_port}🍺`)
        app.listen(config.server_port);
    });
