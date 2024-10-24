import { Router as createRouter } from 'express';
import {viewHomepage} from "./views/home/controller.js";
import {createRoutes as form1Routes} from "./forms/form-1/index.js";
import {createRoutes as form2Routes} from "./forms/form-2/index.js";

/**
 * @returns {Router}
 */
export function buildRouter() {
    const router = createRouter();

    router.route('/').get(viewHomepage);
    router.use('/form-1', form1Routes());
    router.use('/form-2', form2Routes());

    return router;
}