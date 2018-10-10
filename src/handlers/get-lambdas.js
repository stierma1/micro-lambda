var glob = require("glob");
var path = require("path");
var fs = require("fs");

module.exports.configure = (app) => {
  app.get("/api/lambdas", (req, res) => {
    var dataStore = path.join(__dirname,"../../datastore");
    var files = glob.sync(dataStore + "/*.json");
    var lambdas = files.map((file) => {
      return JSON.parse(fs.readFileSync(file, "utf8"));
    })
    res.status(200).json(lambdas);
  });
}
