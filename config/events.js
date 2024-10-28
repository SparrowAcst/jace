const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

const handler = (req, res, next) => {
    req.eventHub = eventEmitter
    next()
}


module.exports = handler