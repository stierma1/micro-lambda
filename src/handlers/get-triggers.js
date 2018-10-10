var path = require("path");
var fs = require("fs");

module.exports.configure = (app) => {
  app.get("/api/triggers", (req, res) => {
    var triggersPath = path.join(__dirname,"../..", "triggers.json");
    var triggers = JSON.parse(fs.readFileSync(triggersPath, "utf8"));
    res.status(200).json(triggers);
  });
}
