/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	context: __dirname,

	devtool: 'source-map',
	performance: {
		hints: false
	},

	entry: path.join( __dirname, 'src', 'index.js' ),

	output: {
		library: 'Clipboard',

		path: path.join( __dirname, 'dist' ),
		filename: 'clipboar.js',
		libraryTarget: 'umd',
		globalObject: '(typeof self !== \'undefined\' ? self : this)'
	},

	optimization: {
		minimizer: [
			new TerserWebpackPlugin( {
				sourceMap: true,
				extractComments: false,
				terserOptions: {
					output: {
						// Preserve license comments.
						comments: /^!/
					}
				}
			} )
		]
	},

	plugins: [
		new webpack.BannerPlugin( {
			banner: `/*!*
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */`,
			raw: true
		} ),
	],

	module: {
		rules: [ {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				compact: false,
				presets: [
					[
						'@babel/preset-env',
						{
							useBuiltIns: 'usage',
							corejs: 3,
							targets: {
								browsers: [
									'last 2 versions',
									'ie 11'
								],
								node: 10
							}
						}
					]
				]
			}
		} ]
	}
};
