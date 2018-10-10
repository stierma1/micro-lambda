var childProcess = require("child_process");
var path = require("path");
var LAMBDA_FILE = "_lambda.js";
class Process{
  constructor(name, runFile, timeout, maxMem){
    this.name = name;
    this.processPath = path.join(__dirname, "../datastore", name);
    this.runFile = runFile;
    this.state = null;
    this.timeout = timeout;
    this.maxMemory = maxMem;
    this.startTime = Date.now();
    this.endTime = null;
    this._resolve = null;
    this._rejolve = null;
    this.promise = new Promise((res, rej) => {
      this._resolve = res;
      this._reject = rej;
    });
    this._process = null;
    this.error = null;
    this.output = null;
    this.inputData = null;
  }

  run(inputData){
    setTimeout(() => {
      if(this.state === null){
        this.state = "timeout";
        this.setEndtime();
        this._process.kill("SIGTERM");
        this.error = "Timeout reached";
        this._resolve(this.processStats());
      }
    },  this.timeout);
    this.inputData = inputData;
    this._run(inputData);
    return this.promise;
  }

  setEndtime(){
    this.endTime = Date.now();
  }

  processStats(){
    return {
      runtime: this.endTime ? this.endTime - this.startTime : Date.now() - this.startTime,
      name:this.name,
      maxMemory:this.maxMemory,
      processPath:this.processPath,
      startTime:this.startTime,
      timeout:this.timeout,
      error:this.error,
      output:this.output,
      runFile: this.runFile,
      state:this.state
    }
  }

  _run(inputData){
    this._process = childProcess.spawn("node", [path.join(this.processPath, LAMBDA_FILE), this.runFile, JSON.stringify(inputData)], {cwd:this.processPath});
    var dataBuffer = new Buffer("");
    var errorBuffer = new Buffer("");
    this._process.stdout.on("data", (data) => {
      dataBuffer = Buffer.concat([dataBuffer, data]);
    });
    this._process.stderr.on("data", (data) => {
      errorBuffer = Buffer.concat([errorBuffer, data]);
    });

    this._process.on("error", () => {
      if(this.state !== null){
        return;
      }
      this.state = "error";
      this.error = "Failed to start Lambda";
      this.resolve(this.processStats());
    });

    this._process.on("close", (code) => {
      if(this.state !== null){
        return;
      }
      this.state = "done";
      if(code === 0){
        this.output = JSON.parse(dataBuffer.toString("utf8"));
      } else {
        this.error = errorBuffer.toString("utf8");
      }
      this._resolve(this.processStats());
    })
  }
}

module.exports = Process;
