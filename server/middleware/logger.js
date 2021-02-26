import winston from 'winston'
import expressWinston from 'express-winston'

const logger = new expressWinston.logger({
  transports: [
    new winston.transports.File({
        filename: './logs/info.log'
    })
  ],
  format: winston.format.json(),
  meta: true,
  msg: "{{req.method}} {{req.url}}",
  expressFormat: true, 
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
});

export default logger