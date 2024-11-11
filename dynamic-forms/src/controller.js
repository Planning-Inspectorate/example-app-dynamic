import {SECTION_STATUS} from "./section.js";
import ListAddMoreQuestion from "./components/list-add-more/question.js";
import questionUtils from "./components/utils/question-utils.js";

/**
 * @typedef {import('@pins/common/src/dynamic-forms/journey-types').JourneyType} JourneyType
 * @typedef {import('./journey').Journey} Journey
 * @typedef {import('./question')} Question
 * @typedef {import('./section').Section} Section
 */

/**
 * @typedef {Object} SectionView
 * @property {string} heading
 * @property {string} status
 * @property {Object} list
 * @property {Array.<RowView>} list.rows
 */

/**
 * @typedef {Object} RowView
 * @property {{ text: string }} key
 * @property {{ text: string } | { html: string }} value
 * @property {{ items: ActionView[] }} [actions]
 */

/**
 * @typedef {Object} ActionView
 * @property {string} href
 * @property {string} text
 * @property {string} [visuallyHiddenText]
 */

/**
 * build a view model for a section in the journey overview
 * @param {string} name
 * @param {string} [status]
 * @returns {SectionView} a representation of a section
 */
function buildSectionViewModel(name, status = '') {
    return {
        heading: name,
        status: status,
        list: {
            rows: []
        }
    };
}

/**
 * build a view model for a row in the journey overview
 * @param {string} key
 * @param {string} value
 * @param {ActionView} action
 * @returns {RowView} a representation of a row
 */
function buildSectionRowViewModel(key, value, action) {
    return {
        key: {
            text: key
        },
        value: {
            html: value
        },
        actions: {
            items: [action]
        }
    };
}

/**
 * build a view model for a row in the journey overview
 * @param {string} key
 * @param {string} value
 * @returns {RowView} a representation of a row
 */
function buildInformationSectionRowViewModel(key, value) {
    return {
        key: {
            text: key,
            classes: 'govuk-!-width-one-half'
        },
        value: {
            html: value
        }
    };
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {string} pageCaption
 * @param {object} viewData
 */
export async function list(req, res, pageCaption, viewData) {
    //render check your answers view
    const {journey, journeyResponse} = res.locals;

    const summaryListData = {
        sections: [],
        completedSectionCount: 0
    };

    for (const section of journey.sections) {
        const status = section.getStatus(journeyResponse);
        const sectionView = buildSectionViewModel(section.name, status);

        // update completed count
        if (status === SECTION_STATUS.COMPLETE) {
            summaryListData.completedSectionCount++;
        }

        // add questions
        for (const question of section.questions) {
            // don't show question on tasklist if set to false
            if (question.taskList === false) {
                continue;
            }

            if (!question.shouldDisplay(journeyResponse)) {
                continue;
            }

            const answers = journey.response?.answers;
            let answer = answers[question.fieldName];
            const conditionalAnswer = questionUtils.getConditionalAnswer(answers, question, answer);
            if (conditionalAnswer) {
                answer = {
                    value: answer,
                    conditional: conditionalAnswer
                };
            }
            const rows = question.formatAnswerForSummary(section.segment, journey, answer);
            rows.forEach((row) => {
                let viewModelRow = buildSectionRowViewModel(row.key, row.value, row.action);
                sectionView.list.rows.push(viewModelRow);
            });
        }

        summaryListData.sections.push(sectionView);
    }

    return res.render(journey.listingPageViewPath, {
        ...viewData,
        pageCaption,
        summaryListData,
        journeyComplete: journey.isComplete(),
        layoutTemplate: journey.journeyTemplate,
        journeyTitle: journey.journeyTitle
    });
}

/**
 * @type {import('express').Handler}
 */
export async function question(req, res) {
    //render an individual question
    const {section, question} = req.params;
    const {journey} = res.locals;

    const sectionObj = journey.getSection(section);
    const questionObj = journey.getQuestionBySectionAndName(section, question);

    if (!questionObj || !sectionObj) {
        return res.redirect(journey.taskListUrl);
    }

    const viewModel = questionObj.prepQuestionForRendering(sectionObj, journey);
    return questionObj.renderAction(res, viewModel);
}

/**
 * @type {import('express').Handler}
 */
export async function save(req, res) {
    //save the response
    const {section, question} = req.params;
    const {journey, journeyResponse} = res.locals;

    const sectionObj = journey.getSection(section);
    const questionObj = journey.getQuestionBySectionAndName(section, question);

    if (!questionObj || !sectionObj) {
        return res.redirect(journey.taskListUrl);
    }

    try {
        return await questionObj.saveAction(req, res, journey, sectionObj, journeyResponse);
    } catch (err) {
        const viewModel = questionObj.prepQuestionForRendering(sectionObj, journey, {
            errorSummary: [{text: err.toString(), href: '#'}]
        });
        return questionObj.renderAction(res, viewModel);
    }
}

/**
 * @type {import('express').Handler}
 */
export async function remove(req, res) {
    //save the response
    const {section, question, answerId} = req.params;
    const {journey, journeyResponse} = res.locals;

    const sectionObj = journey.getSection(section);
    const questionObj = journey.getQuestionBySectionAndName(section, question);

    if (!questionObj || !sectionObj) {
        return res.redirect(journey.taskListUrl);
    }

    try {
        if (questionObj instanceof ListAddMoreQuestion) {
            const goBack = await questionObj.removeAction(req, journeyResponse, answerId);
            if (goBack === true) {
                return res.redirect(journey.getNextQuestionUrl(section, questionObj.fieldName, goBack));
            }
            return res.redirect(journey.getCurrentQuestionUrl(section, question));
        }

        throw new Error(`Cannot remove answer for ${section}/${question}`);
    } catch (err) {
        const viewModel = questionObj.prepQuestionForRendering(sectionObj, journey, {
            errorSummary: [{text: 'Failed to remove answer', href: '#'}]
        });

        return questionObj.renderAction(res, viewModel);
    }
}


