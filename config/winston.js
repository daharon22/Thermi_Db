var appRoot = require("app-root-path");
var winston = require("winston");

var format = winston.format;

var options =
{
    debugFile:
    {
        level: 'debug',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions:true,
        format: format.combine(
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.splat(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
        maxsize: 5242880, //5MB
        maxFiles: 5,
        tailable: true,
        colorize: false,
    },
    errorFile:
    {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions:true,
        format: format.combine(
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.splat(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
        maxsize: 5242880, //5MB
        maxFiles: 5,
        tailable: true,
        colorize: false,
    },
    console:
    {
        level: 'debug',
        handleExceptions:true,
        format: format.combine(
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.splat(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
        colorize: true,
    },
};

var logger = winston.createLogger(
    {
     transports:
     [
        new winston.transports.File(options.debugFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(options.console),
     ],
     exitOnError: false,   
    }
);

logger.stream =
{
    write: function(message, encoding)
    {
        logger.info(message);
    },
};

module.exports = logger;
