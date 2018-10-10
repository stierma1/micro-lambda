module.exports.configure = (app) => {
  app.get("/create/lambdas", (req, res) => {

  res.status(200).send(`<html><head></head><body>
                   <form method="POST" action="/api/lambdas" enctype="multipart/form-data">
                    <input type="file" name="filefield"><br />
                    Name: <input type="text" name="name"> <br />
                    Timeout: <input type="text" name="timeout"> <br />
                    RunFile: <input type="text" name="runFile"> <br />
                    MaxMemory: <input type="text" name="maxMemory"> <br />
                    <input type="submit">
                  </form>
                </body></html>`);
  });
}
