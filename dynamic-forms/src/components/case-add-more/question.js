import AddMoreQuestion from "../add-more/question.js";
import {getLinkedCasesForQuestion} from "../utils/question-utils.js";

import {randomUUID} from "crypto";

/**
 * @typedef {import('../../journey-response').JourneyResponse} JourneyResponse
 */

export default class CaseAddMoreQuestion extends AddMoreQuestion {
    /**
     * @param {Object} params
     * @param {string} params.title
     * @param {string} params.question
     * @param {string} params.fieldName
     * @param {string} params.viewFolder
     * @param {string} [params.hint]
     * @param {string} [params.html]
     * @param {Array.<import('../../validator/base-validator')>} [params.validators]
     */
    constructor({title, question, fieldName, viewFolder, hint, html, validators}) {
        super({
            title,
            viewFolder,
            fieldName,
            question,
            hint,
            html,
            validators
        });
    }

    /**
     * adds a uuid to the data to save
     * @param {import('express').Request} req
     * @returns
     */
    async getDataToSave(req) {
        return {addMoreId: randomUUID(), value: req.body[this.fieldName]?.trim()};
    }

    /**
     * @param {Object.<Any>} answer
     * @returns The formatted caseRef to be presented in the UI
     */
    format(answer) {
        return answer?.caseReference;
    }

    /**
     * @param {JourneyResponse} journeyResponse
     * @param {string} fieldName
     */
    getAddMoreAnswers(journeyResponse, fieldName) {
        return getLinkedCasesForQuestion(journeyResponse, fieldName);
    }

    /**
     * @param {import('express').Request} req
     * @param {string} parentFieldName
     * @param {JourneyResponse} journeyResponse
     * @param {Object} responseToSave
     */
    async saveList(req, parentFieldName, journeyResponse, responseToSave) {
        const linkedCases = responseToSave.answers[parentFieldName];
        await Promise.all(
          linkedCases.map((linkedCase) => {
              linkedCase.fieldName = this.fieldName;
              return req.appealsApiClient.postSubmissionLinkedCase(
                journeyResponse.journeyId,
                journeyResponse.referenceId,
                {
                    fieldName: this.fieldName,
                    caseReference: linkedCase.value
                }
              );
          })
        );
    }

    /**
     * removes answer with answerId from response if present
     * @param {import('express').Request} req
     * @param {JourneyResponse} journeyResponse
     * @param {string} answerId
     * @returns {Promise<JourneyResponse | boolean> } updated JourneyResponse
     */
    async removeList(req, journeyResponse, answerId) {
        const updated = await req.appealsApiClient.deleteSubmissionLinkedCase(
            journeyResponse.journeyId,
            journeyResponse.referenceId,
            answerId
        );

        journeyResponse.answers = updated;

        return updated.SubmissionLinkedCase?.length > 0 ? journeyResponse : true;
    }
}
