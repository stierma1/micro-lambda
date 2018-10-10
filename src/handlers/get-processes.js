var SHARED_STATE = require("../shared-state");

module.exports.configure = (app) => {
  app.get("/api/processes", (req, res) => {
      res.status(200).json(SHARED_STATE.processes.map((proc) => {
        return proc.processStats();
      }));
  })
}
