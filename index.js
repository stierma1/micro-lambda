var Process = require("./src/process");

var proc = new Process("add1", "index.js.add", 5000, 500);

proc.run({"num":0}).then((stat) => {
  console.log(stat);
})
