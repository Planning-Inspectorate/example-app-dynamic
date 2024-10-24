import BaseValidator from "./base-validator.js";
// import multifileUploadSchema from "../../validators/common/schemas/multifile-upload-schema.js";
import {checkSchema} from "express-validator";


/**
 * @typedef {import('../question.js')} Question
 */

/**
 * enforces that files being uploaded are valid
 * @class
 */
export default class MultifileUploadValidator extends BaseValidator {
    /**
     * creates an instance of a MultifileUploadValidator
     * @param {string} [errorMessage] - custom error message to show on validation failure
     */
    constructor(errorMessage) {
        super();

        // standard generic error messages for multifile upload are currently
        // hardcoded into the multifileUploadSchema but this field
        // is included here in case it is required later
        if (errorMessage) {
            this.errorMessage = errorMessage;
        }
    }

    /**
     * validates response body files on path based on questionObj's fieldname
     * @param {Question} questionObj
     */
    validate(questionObj) {
        const path = `files.${questionObj.fieldName}.*`;
        return true; // TODO
    }
}
