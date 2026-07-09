import winston from 'winston';
import { config } from '../config/index';

const { combine, timestamp, colorize, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp: ts, stack }) => {
  return `${String(ts)} [${level}]: ${stack ? String(stack) : String(message)}`;
});

export const logger = winston.createLogger({
  level: config.logLevel,
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    config.env === 'development' ? colorize() : winston.format.uncolorize(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 10,
    }),
  ],
});
