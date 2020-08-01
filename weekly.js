const Job = require('./events');

const job = new Job();

job.on("progress", console.log);

job.emit("start");