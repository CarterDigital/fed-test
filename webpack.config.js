const path = require("path")

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "production")
	},
	devServer: {
		contentBase: path.join(__dirname, "production"),
		port: 8080
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env", "stage-0", "react"]
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"}
				]
			},
			{
			  test: /\.svg$/,
			  use: [
				{
				  loader: "babel-loader"
				},
				{
				  loader: "react-svg-loader",
				  options: {
					jsx: true // true outputs JSX tags
				  }
				}
			  ]
			}
		]
	}
}











