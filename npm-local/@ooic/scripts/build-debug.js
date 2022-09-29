const config = require("./webpack.config.js");
const webpack = require("webpack");
const fs = require("fs");

const env = { target: "development", watch: "false" };

const cfg = config(env);
const compiler = webpack(cfg);

fs.rmSync("build-debug", { recursive: true, force: true });
compiler.run((err, stats) => {
  console.log(stats)
  if (err) console.log(err);
});
