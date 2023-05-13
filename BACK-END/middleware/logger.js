const winston = require("winston");
const { createLogger, format, transports } = winston;

function loggerMiddleware(req, res, next) {
  const userID = req.userID; // Assuming you have a `user` property on the `req` object with an `id` property

  const userTransport = new winston.transports.File({
    filename: `logs/${userID}.log`,
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD" }),
      format.printf((info) => `${info.timestamp} ${info.message}`)
    ),
  });

  const logger = createLogger({
    transports: [userTransport],
  });

  // Add the logger to the request object
  req.logger = logger;

  next();
}
module.exports = loggerMiddleware
