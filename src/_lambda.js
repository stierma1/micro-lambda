
var inputData = JSON.parse(process.argv[process.argv.length - 1]);
var runFileString = process.argv[process.argv.length - 2];
var segs = runFileString.split(".");
var runFunction = segs.pop();
var runFile = segs.join(".");

(async function() {
  var returnValue = null;

  if(runFunction){
    returnValue = await require("./" + runFile)[runFunction](inputData);
  } else {
    returnValue = await require("./" + runFile)(inputData);
  }

  console.log(JSON.stringify(returnValue));
  process.exit(0);
})()
