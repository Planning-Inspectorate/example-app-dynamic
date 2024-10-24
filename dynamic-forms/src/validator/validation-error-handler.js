import {validationResult} from "express-validator";

const expressValidationErrorsToGovUkErrorList = (expressValidationErrors) => {
    const mappedErrors = [];

    if (Object.keys(expressValidationErrors).length === 0) {
        return mappedErrors;
    }

    Object.keys(expressValidationErrors).forEach((key) => {
        mappedErrors.push({
            text: expressValidationErrors[key].msg,
            href: `#${key}`
        });
    });

    return mappedErrors;
};

export const validationErrorHandler = (req, res, next) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const mappedErrors = errors.mapped();

    // date-validator returns some empty error messages to avoid having an error for each field
    // there is probably a better way but we shouldn't block with an empty error anyway
    const filteredErrors = Object.entries(mappedErrors).filter(([_key, error]) => error.msg);
    if (filteredErrors.length === 0) return next();

    const mappedAndFilteredErrors = Object.fromEntries(filteredErrors);

    req.body.errors = mappedAndFilteredErrors;
    req.body.errorSummary = expressValidationErrorsToGovUkErrorList(mappedAndFilteredErrors);

    return next();
};
