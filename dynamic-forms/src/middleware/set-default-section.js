import config from "../../config.js";

export default () => (req, res, next) => {
    if (!req.params.section) {
        req.params.section = config.dynamicForms.DEFAULT_SECTION;
    }
    next();
}
