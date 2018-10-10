var SHARED_STATE = {
  processes:[],
  jobs:[]
};

module.exports = SHARED_STATE;

setInterval(() => {
  SHARED_STATE.processes = SHARED_STATE.processes.filter((proc) => {
    return proc.output === null && proc.error === null;
  })
}, 1000*60*5);
