import pino from 'pino';
import {loadConfig} from '../app/config.js';

/**
 * Cache the logger instance
 * @type {pino.BaseLogger|undefined}
 */
let logger;

/**
 * @returns {pino.BaseLogger}
 */
export function getLogger() {
    if (logger) {
        return logger;
    }
    const config = loadConfig();

    // configure the pino logger for use within the app
    logger = pino({
        transport: {
            target: 'pino-pretty',
            level: config.logLevel,
            options: {
                colorize: true
            }
        }
    });
    return logger;
}