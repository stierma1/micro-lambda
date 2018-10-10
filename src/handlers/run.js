var SHARED_STATE = require("../shared-state");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var Process = require("../process");

module.exports.configure = (app) => {
  app.post("/api/run/:lambdaName", bodyParser.json("100mb"), (req, res) => {
    let {dontWait} = req.query;
    let {lambdaName} = req.params;
    fs.readFile(path.join(__dirname, "../../datastore", lambdaName + ".json"), "utf8", (e, f) => {
      if(e){
        res.status(500).send(e);
        return;
      }
      var {name, timeout, runFile, maxMemory} = JSON.parse(f);
      var proc = new Process(name, runFile, timeout, maxMemory);
      SHARED_STATE.processes.push(proc);
      var prom = proc.run(req.body);

      if(dontWait){
        res.status(202).end();
      } else {
        prom.then(({output, error}) => {
          if(error){
            res.status(400).send(error);
            return;
          }
          res.status(200).json(output);
        }).catch((err) => {
          res.status(400).send(err);
        });
      }

    });
  })
}
