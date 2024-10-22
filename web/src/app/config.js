import dotenv from 'dotenv';
import path from 'node:path';
import {fileURLToPath} from 'url';

// get the file path for the directory this file is in
const dirname = path.dirname(fileURLToPath(import.meta.url));
// get the file path for the web/src directory
const srcDir = path.join(dirname, '..');
// get the file path for the .static directory
const staticDir = path.join(srcDir, '.static');

// cache the config
let config;

export function loadConfig() {
    if (config) {
        return config
    }
    // load configuration from .env file into process.env
    dotenv.config();

    const {
        API_URL,
        LOG_LEVEL,
        HTTP_PORT
    } = process.env;

    config = {
        // the URL of the API service
        apiUrl: API_URL || 'http://localhost:3000',
        // the log level to use
        logLevel: LOG_LEVEL || 'info',
        // the HTTP port to listen on
        httpPort: HTTP_PORT || 8080,
        // the web/src directory
        srcDir,
        sessionSecret: 'shhh, secret!',
        // the static directory to serve assets from (images, css, etc..)
        staticDir
    };

    return config;
}