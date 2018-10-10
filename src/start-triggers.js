var fs = require("fs");
var path = require("path");
var CronJob = require("cron");
var triggers = JSON.parse(fs.readFileSync(path.join(__dirname, "../triggers.json"), "utf8"));
var setTrigger = require("./set-trigger");

for(var lambdaName in triggers){
  var {cronString, numberOfTriggers} = triggers[lambdaName];
  setTrigger(lambdaName, cronString, numberOfTriggers);
}
