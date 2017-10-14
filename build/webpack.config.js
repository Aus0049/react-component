const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const px2rem = require('postcss-px2rem');
const autoprefixer = require('autoprefixer');
const debug = require('debug')('app:webpack:config')

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__

const webpackConfig = {
    name: 'client',
    target: 'web',
    devtool: config.compiler_devtool,
    resolve: {
        root: paths.client(),
        extensions: ['', '.web.js', '.js', '.jsx', '.json'],
        alias: {
            'components': config.components,
            'sass': config.static_style
        }
    },
    module: {}
}

debug(config.static_style);

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = paths.client('main.js')

webpackConfig.entry = {
    app: __DEV__
        ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
        : [APP_ENTRY],
    vendor: config.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
    filename: `[name]_[${config.compiler_hash_type}].js`,
    path: paths.dist(),
    publicPath: config.compiler_public_path,
    // 添加 chunkFilename
    chunkFilename: '[name].[chunkhash:5].chunk.js'
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
        template: paths.client('index.html'),
        hash: false,
        // favicon: paths.client('static/favicon.ico'),
        filename: 'index.html',
        inject: 'body',
        minify: {
            collapseWhitespace: true
        }
    })
]

if (__DEV__) {
    debug('Enable plugins for live development (HMR, NoErrors).')
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    )
} else if (__PROD__) {
    debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
    webpackConfig.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        })
    )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
    webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    )
}

// ------------------------------------
// Loaders
// ------------------------------------
// eslint
webpackConfig.eslint = {
    configFile: './.eslintrc',
}

webpackConfig.module.preLoaders = [{
    test: /\.js$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
}]

// JavaScript / JSON
webpackConfig.module.loaders = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: config.compiler_babel
}, {
    test: /\.json$/,
    loader: 'json'
}]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

webpackConfig.module.loaders.push({
    test: /\.scss$/,
    exclude: null,
    loaders: [
        'style',
        BASE_CSS_LOADER,
        'postcss',
        'sass?sourceMap'
    ]
})
webpackConfig.module.loaders.push({
    test: /\.css$/,
    exclude: null,
    loaders: [
        'style',
        BASE_CSS_LOADER,
        'postcss',
        'postcss-loader'
    ]
})

webpackConfig.sassLoader = {
    includePaths: paths.client('styles')
}

webpackConfig.postcss = [
    px2rem({remUnit: 75}),
    autoprefixer({browsers: ['last 2 versions']})
];
webpackConfig.module.loaders.push(
    {test: /\.woff(\?.*)?$/, loader: 'url?name=fonts/[name].[ext]'},
    {
        test: /\.woff2(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
    },
    {test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'},
    {test: /\.ttf(\?.*)?$/, loader: 'url?name=fonts/[name].[ext]'},
    {test: /\.eot(\?.*)?$/, loader: 'url?name=fonts/[name].[ext]'},
    {test: /\.svg(\?.*)?$/, loader: 'url?limit=1024&name=img/[name].[ext]'},
    {test: /\.swf(\?.*)?$/, loader: 'file?prefix=swf/&name=[path][name].[ext]&limit=10000&mimetype=application/swf'},
    {test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192&name=[name]_[hash:8].[ext]'}
)
if (!__DEV__) {
    debug('Apply ExtractTextPlugin to CSS loaders.')
    webpackConfig.module.loaders.filter((loader) =>
        loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
    ).forEach((loader) => {
        const first = loader.loaders[0]
        const rest = loader.loaders.slice(1)
        loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
        delete loader.loaders
    })

    webpackConfig.plugins.push(
        new ExtractTextPlugin('[name]_[contenthash].css', {
            allChunks: true
        })
    )
}

module.exports = webpackConfig
