const CleanWebpackPlugin = require('clean-webpack-plugin'),
	  HtmlWebpackPlugin = require('html-webpack-plugin'),
	  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      AutoPrefixer = require('autoprefixer'),
	  UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: [
		'./frontend/js/app.js',
	],
	
	output: {
		filename: './js/app.js'
	},

	devServer: {
		port: 9999
	},
	
	devtool: 'source-map',
	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env'
					]
				}
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								AutoPrefixer({
									browsers: [
										'ie >= 8', 'last 4 version'
									]
								})
							]
						}
					},
					'less-loader'
				]
			},
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                loader: 'handlebars-loader',
				options: {
                    helperDirs: [
                        __dirname + '/frontend/js/helpers/handlebars'
                    ]
				}
            }
		]
	},
	
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin({}),
			new UglifyJsPlugin({
				sourceMap: true
			})
		]
	},
	
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './frontend/index.html',
			filename: 'index.html',
			minify: {
				useShortDoctype: true,
				removeStyleLinkTypeAttributes: true,
				removeScriptTypeAttributes: true,
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/app.css'
		})
	]
};