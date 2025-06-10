const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 8081,
    hot: true,
    open: true
  }
});
