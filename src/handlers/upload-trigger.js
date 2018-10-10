var bodyParser = require('body-parser');
var fs = require("fs");
var path = require("path");
var TRIGGER_PATH = path.join(__dirname, "../../triggers.json");
var setTrigger = require("../set-trigger");

module.exports.configure = (app) => {
    app.post("/api/triggers", bodyParser.urlencoded({ extended: false }), (req, res) => {
        var {lambdaName, cronString, numberOfTriggers} = req.body;
        numberOfTriggers = numberOfTriggers || 1;
        var triggers = JSON.parse(fs.readFileSync(TRIGGER_PATH, "utf8"));
        triggers[lambdaName] = {cronString, numberOfTriggers};
        fs.writeFileSync(TRIGGER_PATH, JSON.stringify(triggers, null, 2));
        setTrigger(lambdaName, cronString, numberOfTriggers);
        res.status(200).end();
    });
}
