import { Router as createRouter } from 'express';
import {Section} from "@pins/dynamic-forms/src/section.js";
import {getQuestions} from "../questions.js";
import {buildGetJourney} from "@pins/dynamic-forms/src/middleware/build-get-journey.js";
import {list, question, save} from "@pins/dynamic-forms/src/controller.js";
import validate from "@pins/dynamic-forms/src/validator/validator.js";
import {validationErrorHandler} from "@pins/dynamic-forms/src/validator/validation-error-handler.js";
import {Journey} from "@pins/dynamic-forms/src/journey.js";
import {JourneyResponse} from "@pins/dynamic-forms/src/journey-response.js";

/**
 * @param {import('@pins/dynamic-forms/src/journey-response.js').JourneyResponse} response
 * @returns {Journey}
 */
export function createJourney(response) {
    const questions = getQuestions();

    return new Journey({
        journeyId: 'form-1',
        sections: [
            new Section('Section 1', 'section-1')
                .addQuestion(questions.otherTenantsAgriculturalHolding)
                .addQuestion(questions.appealSiteAddress),
            new Section('Section 2', 'section-2')
                .addQuestion(questions.myQuestion)
        ],
        taskListUrl: 'task-list',
        journeyTemplate: 'views/layouts/submission-form.njk',
        listingPageViewPath: 'views/layouts/submission.njk',
        journeyTitle: 'My First Form',
        returnToListing: true,
        makeBaseUrl: (response) => `/form-1?id=${response.referenceId}`,
        response
    });
}

/**
 * @type {import('express').Handler}
 */
async function getJourneyResponse(request, response, next) {
    response.locals.journeyResponse = new JourneyResponse(
        'form-1',
        'abc-123',
        {}
    );
    next();
}

export function createRoutes() {
    const router = createRouter();
    const getJourney = buildGetJourney(createJourney);

    router.get(
        '/:section/:question',
        getJourneyResponse,
        getJourney,
        question
    );

    router.post(
        '/:section/:question',
        getJourneyResponse,
        getJourney,
        validate,
        validationErrorHandler,
        save
    );

    router.get(
        '/task-list',
        getJourneyResponse,
        getJourney,
        (req, res) => list(req, res, 'My Form Task list', {})
    );

    return router;
}