var CronJob = require("cron").CronJob;
var Process = require("./process");
var fs = require("fs");
var SHARED_STATE = require("./shared-state");
var path = require("path");

module.exports = (lambdaName, cronString, num) => {
  try{
    let {name, runFile, maxMemory, timeout} = JSON.parse(fs.readFileSync(path.join(__dirname, "../datastore", lambdaName + ".json"), "utf8"))
    var job = new CronJob(cronString, () => {
      fs.appendFileSync(path.join(__dirname, "../log.txt"), `Starting ${name}: ${cronString}\n`);
      try{
        for(var i = 0; i < parseInt(num); i++){
          var proc = new Process(name, runFile, timeout, maxMemory);
          SHARED_STATE.processes.push(proc);
          proc.run({time:Date.now(),runSequence:i});
        }
      } catch(e){
        fs.appendFileSync(path.join(__dirname, "../error-log.txt"), e.stack.toString());
      }
    }, null, true, 'America/Los_Angeles', {}, true);
    SHARED_STATE.jobs.push(job);
  } catch(e){
    fs.appendFileSync(path.join(__dirname, "../error-log.txt"), e.stack.toString());
  }


};
