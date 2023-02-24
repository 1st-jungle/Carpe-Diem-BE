import * as winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import * as S3StreamLogger from 's3-streamlogger';
import config from '../../config';

const { combine, timestamp, printf } = winston.format;

interface LogInfo {
    level: string;
    message: string;
    timestamp: string;
}

function s3_stream(level) {
    const time_data = new Date();

    return new S3StreamLogger.S3StreamLogger({
        bucket: `${config.aws.log_bucket_name}`,
        tags: { type: 'log', version: `${config.version}` },
        folder: `${level}`,
        name_format: `${time_data}.log`,
        access_key_id: `${config.aws.access_key_id}`,
        secret_access_key: `${config.aws.secret_access_key}`,
    });
}

const logFormat = printf((info: LogInfo) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger: winston.Logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        new winstonDaily({
            level: 'info',
            stream: s3_stream('info'),
        }),

        new winstonDaily({
            level: 'error',
            stream: s3_stream('error'),
        }),
    ],

    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            stream: s3_stream('error'),
        }),
    ],
});

export default logger;
