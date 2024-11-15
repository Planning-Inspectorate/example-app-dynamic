import Question from "../../question.js";

/**
 * @typedef {import('../../question').QuestionViewModel} QuestionViewModel
 * @typedef {import('../../journey').Journey} Journey
 * @typedef {import('../../journey-response').JourneyResponse} JourneyResponse
 * @typedef {import('../../section').Section} Section
 * @typedef {import('../../validator/base-validator')} BaseValidator
 */

/**
 * @class
 */
export default class SingleLineInputQuestion extends Question {
    /** @type {Record<string, string>} */
    inputAttributes;

    /**
     * @param {Object} params
     * @param {string} params.title
     * @param {string} params.question
     * @param {string} params.fieldName
     * @param {string} [params.description]
     * @param {string} [params.url]
     * @param {string} [params.html]
     * @param {string} [params.hint]
     * @param {string|undefined} [params.label] if defined this show as a label for the input and the question will just be a standard h1
     * @param {Array.<BaseValidator>} [params.validators]
     * @param {Record<string, string>} [params.inputAttributes] html attributes to add to the input
     */
    constructor(params) {
        super({
            ...params,
            viewFolder: 'single-line-input'
        });

        this.label = params.label;
        this.inputAttributes = params.inputAttributes || {};
    }

    prepQuestionForRendering(section, journey, customViewData, payload) {
        let viewModel = super.prepQuestionForRendering(section, journey, customViewData);
        viewModel.question.label = this.label;
        viewModel.question.value = payload
            ? payload[viewModel.question.fieldName]
            : viewModel.question.value;
        viewModel.question.attributes = this.inputAttributes;
        return viewModel;
    }
}
