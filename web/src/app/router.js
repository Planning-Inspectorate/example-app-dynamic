import { Router as createRouter } from 'express';
import {viewHomepage} from "./views/home/controller.js";

/**
 * @returns {Router}
 */
export function buildRouter() {
    // create an express router, for handling different paths
    const router = createRouter();

    // setup the handlers for the pages
    router.route('/').get(viewHomepage);

    return router;
}