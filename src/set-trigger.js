var CronJob = require("cron");
var Process = require("./process");
var fs = require("fs");
var SHARED_STATE = require("./shared-state");
var path = require("path");

module.exports = (lambdaName, cronString, num) => {
  try{
    let {name, runFile, maxMemory, timeout} = JSON.parse(fs.readFileSync(path.join(__dirname, "../datastore", lambdaName + ".json"), "utf8"))
    var job = new CronJob(cronString, () => {
      fs.appendFileSync(path.join(__dirname, "../../log.txt"), `Starting ${name}: ${cronString}`);
      try{
        for(var i = 0; i < parseInt(num); i++){
          var proc = new Process(name, runFile, timeout, maxMemory);
          SHARED_STATE.push(proc);
          proc.run({time:Date.now()});
        }
      } catch(e){
        fs.appendFileSync(path.join(__dirname, "../../error-log.txt"), e.stack.toString());
      }
    });
  } catch(e){
    fs.appendFileSync(path.join(__dirname, "../../error-log.txt"), e.stack.toString());
  }

  SHARED_STATE.jobs.push(job);
};
