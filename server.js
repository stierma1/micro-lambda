var express = require("express");
var handlers = require("./src/handlers");
require("./src/start-triggers");

var app = express();

for(var i in handlers){
  handlers[i].configure(app);
}

app.listen(7005, () => {

});
