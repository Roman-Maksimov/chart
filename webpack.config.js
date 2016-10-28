const path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        //app: ["webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server", "./src/main.js"]
        app: ["./src/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "build/"),
        publicPath: "/",
        filename: "js/bundle.js"
    },

    // The setup may be problematic on certain versions of Windows, Ubuntu, and Vagrant.
    // We can solve this through polling:
    watchOptions: {
        // Delay the rebuild after the first change
        aggregateTimeout: 300,
        // Poll using interval (in ms, accepts boolean too)
        poll: 1000
    },

    devServer: {
        contentBase: "build/",
        publicPath: "/",

        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,

        // Unlike the cli flag, this doesn't set
        // HotModuleReplacementPlugin!
        hot: true,
        inline: true,

        /*proxy: {
            '/ajax/*': 'http://your.backend/'
        },*/

        stats: { colors: true }
    },

    devtool: '#inline-source-map',

    module: {
        preLoaders: [
            {
                test: /.spec\.js$/,
                include: /(src|tests)/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-decorators-legacy']
            }/*,
            {
                test: /\.js?$/,
                include: /src/,
                exclude: /(node_modules|__tests__)/,
                loader: 'babel-istanbul',
                query: {
                    cacheDirectory: false,
                },
            },*/
        ],
        loaders: [
            {
                test: /.html?$/,
                loaders: ['html-loader'],
                exclude: /node_modules/
            },
            {
                test: /.jsx?$/,
                //loader: 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-decorators-legacy',
                loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-decorators-legacy'],
                exclude: [/node_modules/, /src\/assets\/mdl/, /\.ejs/]
            },
            {
                test: /(node_modules|src[\\\/]vendor)[\\\/]react-toolbox[\\\/].*\.s?css$/,
                //loaders: ['style-loader', 'css-loader', 'sass-loader', ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')],
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader', ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=last 3 versions!sass')],
                exclude: /(node_modules|src[\\\/]vendor)/
            }
        ]
    },
    resolve: {
        root: __dirname,
        extensions: ["", ".js", ".jsx", ".css", ".scss", ".htm", ".html"]
    },
    plugins: [
        // Enable multi-pass compilation for enhanced performance
        // in larger projects. Good default.
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),

        new webpack.NoErrorsPlugin(),

        new ExtractTextPlugin('css/main.css', {
            publicPath: 'css/',
            allChunks: true
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            title: 'Trial'
        }),

        new CopyWebpackPlugin([
            {
                // copy normalize.css (won't compile it into the bundle)
                from: 'node_modules/normalize.css/normalize.css',
                to: 'css/normalize.css'
            },
            {
                // copy MDL css file
                from: 'node_modules/material-design-lite/material.min.css',
                to: 'css/material.min.css'
            },
            {
                // copy MDL css map file
                from: 'node_modules/material-design-lite/material.min.css.map',
                to: 'css/material.min.css.map'
            },
            {
                // copy MDL js file
                from: 'node_modules/material-design-lite/material.min.js',
                to: 'js/material.min.js'
            },
            {
                // copy MDL js Map file
                from: 'node_modules/material-design-lite/material.min.js.map',
                to: 'js/material.min.js.map'
            },
            {
                // copy fonts
                from: 'src/styles/fonts',
                to: 'fonts'
            },
            {
                // copy all from /resources path
                context: 'resources',
                from: '**/*',
                to: '.',
                ignore: [
                    // don't copy PSD files
                    'img/**/*.psd'
                ]
            }
        ]),

        new webpack.DefinePlugin({
            STAGE: JSON.stringify(JSON.stringify(process.env.NODE_ENV).replace(new RegExp("[\"']", "g"), '').trim() || 'development'),
            BACKEND_URL: JSON.stringify('http://localhost:8080')
        })
    ]
};
