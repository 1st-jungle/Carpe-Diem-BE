import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import appRoot from 'app-root-path';

const logDir = `${appRoot}/logs`;

const { combine, timestamp, printf, colorize, simple } = winston.format;

const logFormat = printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),

        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],

    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

// logger.stream = {
//     write: (message: String) => {
//         logger.info(message);
//     },
// };

logger.add(
    new winston.transports.Console({
        format: combine(colorize(), simple()),
    }),
);

// export default devLogger;

export default logger;
