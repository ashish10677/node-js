const EventEmitter = require('events');

class Job extends EventEmitter {
    constructor(ops) {
        super(ops);
        this.on('start', () => {
            this.process();
        })
    }

    process = () => {
        let count = 1;
        this.interval = setInterval(() => {
            this.emit('progress', count++)
            if(count === 10) {
                clearInterval(this.interval);
            }
        }, 500)
    }
}

module.exports = Job;