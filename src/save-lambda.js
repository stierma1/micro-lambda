var childProcess = require("child_process");
var path = require("path");
var fs = require("fs");

function save(zipBuffer, metaInfo){
  var {name} = metaInfo;
  var zipFileSavePath = path.join(__dirname, "../datastore", name + ".zip");
  var directoryPath = path.join(__dirname, "../datastore", name);
  fs.writeFileSync(zipFileSavePath, zipBuffer);
  childProcess.spawnSync("mkdir", ["-p", name], {cwd:path.join(__dirname, "../datastore")})
  childProcess.spawnSync("unzip", ["-o", zipFileSavePath, "-d", name], {cwd:path.join(__dirname, "../datastore")});
  childProcess.spawnSync("rm", ["-rf", path.join(__dirname, "../datastore", name, "node_modules")]);
  childProcess.spawnSync("npm", ["install"], {cwd:directoryPath});
  childProcess.spawnSync("cp", [path.join(__dirname, "_lambda.js"), path.join(__dirname, "../datastore", name)]);
  fs.writeFileSync(path.join(__dirname, "../datastore", name + ".json"), JSON.stringify(metaInfo));
}

module.exports = save;
//save(fs.readFileSync(path.join(__dirname, "../add1.zip")), {name:"add1", runfile:"index.js.add"});
