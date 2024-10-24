import {format as formatDate} from "date-fns";

import {getLPA, getLPAById} from "../../../lib/appeals-api-wrapper.js";

import {APPEALS_CASE_DATA} from "@pins/common/src/constants";

const typeCodeToSubmissionInformationString = {
    [APPEALS_CASE_DATA.APPEAL_TYPE_CODE.HAS]: 'Householder',
    [APPEALS_CASE_DATA.APPEAL_TYPE_CODE.S78]: 'Full planning'
};

/**
 *
 * @param {import('appeals-service-api').Api.AppellantSubmission} appellantSubmission
 * @returns
 */
export async function formatBeforeYouStartSection(appellantSubmission) {
    const {LPACode, appealTypeCode, applicationDecisionDate} = appellantSubmission;

    let lpa;
    try {
        lpa = await getLPA(LPACode);
    } catch (err) {
        lpa = await getLPAById(LPACode);
    }

    const appealType = typeCodeToSubmissionInformationString[appealTypeCode];

    const decisionDate = formatDate(new Date(applicationDecisionDate), 'd MMMM yyyy');

    return {
        heading: 'Before you start',
        list: {
            rows: [
                {
                    key: {
                        text: 'Local planning authority',
                        classes: 'govuk-!-width-one-half'
                    },
                    value: {
                        html: lpa.name
                    }
                },
                {
                    key: {
                        text: 'Appeal type',
                        classes: 'govuk-!-width-one-half'
                    },
                    value: {
                        html: appealType
                    }
                },
                {
                    key: {
                        text: 'Decision date',
                        classes: 'govuk-!-width-one-half'
                    },
                    value: {
                        html: decisionDate
                    }
                }
            ]
        }
    };
}

export function formattedSubmissionDate() {
    return formatDate(new Date(), 'd MMMM yyyy');
}
