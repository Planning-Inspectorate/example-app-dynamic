import {getLogger} from './logger.js';

/**
 * Log all requests to console
 *
 * @type {import('express').RequestHandler}
 */
export function logRequests(_, res, next) {
    const logger = getLogger();
    const { req, statusCode } = res;
    logger.debug(`${req.method} ${statusCode} ${req.originalUrl.toString()}`);
    next();
}