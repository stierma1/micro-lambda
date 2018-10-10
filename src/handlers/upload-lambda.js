var Busboy = require("busboy");
var save = require("../save-lambda");

module.exports.configure = (app) => {
    app.post("/api/lambdas", (req, res) => {
        var busboy = new Busboy({
            headers: req.headers
        });
        let metaInfo = {};
        let buffer = new Buffer("");
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            file.on('data', function(data) {
                buffer = Buffer.concat([buffer, new Buffer(data)]);
            });

            file.on('end', function() {

            });
        });
        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
          metaInfo[fieldname] = val;
        });
        busboy.on('finish', function() {
          save(buffer, metaInfo);
          res.status(200).end();
        });
        busboy.on("error", function(e){

        })
        req.pipe(busboy);
    });
}
