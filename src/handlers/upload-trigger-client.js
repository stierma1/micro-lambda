module.exports.configure = (app) => {
  app.get("/create/triggers", (req, res) => {

  res.status(200).send(`<html><head></head><body>
                   <form method="POST" action="/api/triggers">
                    Name: <input type="text" name="lambdaName"> <br />
                    CronString: <input type="text" name="cronString"> <br />
                    Number Of Triggers: <input type="text" name="numberOfTriggers"> <br />
                    <input type="submit">
                  </form>
                </body></html>`);
  });
}
