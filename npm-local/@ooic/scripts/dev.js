const config = require("./webpack.config.js");
const webpack = require("webpack");
const asyncAsciify = require("./asyncAsciify");
const env = { target: "development", watch: "true" };
const fs = require("fs");

const cfg = config(env);

fs.rmSync("build-debug", { recursive: true, force: true });
asyncAsciify("OOIC", { font: "starwars", color: "green" }).then(() => {
  const compiler = webpack(cfg, (err, stats) => {
    if (err) console.log(err);
  });
});
 